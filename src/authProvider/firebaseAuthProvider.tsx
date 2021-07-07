import firebase from 'firebase/app';
import 'firebase/auth';
import { User } from '@firebase/auth-types';
import { AuthProvider, UserIdentity, fetchUtils } from 'react-admin';
import { login} from './userApi';
import Cookies from 'js-cookie';
import { TOKEN_KEY, AUTH_KEY } from '../utils';
import * as _ from 'lodash';
export interface HttpErrorType {
  status: number;
  message: string;
  json?: any;
}

export function retrieveStatusTxt(status: number): 'ok' | 'unauthenticated' {
  // Make sure any successful status is OK.
  if (status >= 200 && status < 300) {
    return 'ok';
  }
  switch (status) {
    case 401: // 'unauthenticated'
      return 'unauthenticated';
      
    case 403: // 'permission-denied'
    case 0: // 'internal'
    case 400: // 'invalid-argument'
    case 404: // 'not-found'
    case 409: // 'aborted'
    case 429: // 'resource-exhausted'
    case 499: // 'cancelled'
    case 500: // 'internal'
    case 501: // 'unimplemented'
    case 503: // 'unavailable'
    case 504: // 'deadline-exceeded'
    default:
      // ignore
      return 'ok';
  }
}

export interface RAFirebaseOptions {
  rootRef?: string | (() => string);
  app?: any;
  logging?: boolean;
  watch?: string[];
  dontwatch?: string[];
  overrideDefaultId?: boolean;
  disableMeta?: boolean;
  renameMetaFields?: {
    created_at?: string, // default createdate
    created_by?: string, // default createdby
    updated_at?: string, // default lastupdate
    updated_by?: string, // default updatedby
  },
  dontAddIdFieldToDoc?: boolean;
  persistence?: 'session' | 'local' | 'none';
  softDelete?: boolean;
  associateUsersById?: boolean;
  metaFieldCasing?: 'lower' | 'camel' | 'snake' | 'pascal' | 'kebab';
  relativeFilePaths?: boolean;
  useFileNamesInStorage?: boolean;
  lazyLoading?: {
    enabled: boolean
  };
  firestoreCostsLogger?: {
    enabled: boolean;
    persistCount?: boolean;
  };
}

class AuthClient {
  private auth: firebase.auth.Auth;

  constructor(firebaseConfig: {}, optionsInput?: RAFirebaseOptions) {
    const options = optionsInput || {};
    console.log('Auth Client: initializing...', { firebaseConfig, options });
    this.auth = firebase.auth();
    options.persistence && this.setPersistence(options.persistence);
  }

  setPersistence(persistenceInput: 'session' | 'local' | 'none') {
    let persistenceResolved: string;
    switch (persistenceInput) {
      case 'local':
        persistenceResolved = firebase.auth.Auth.Persistence.LOCAL;
        break;
      case 'none':
        persistenceResolved = firebase.auth.Auth.Persistence.NONE;
        break;
      case 'session':
      default:
        persistenceResolved = firebase.auth.Auth.Persistence.SESSION;
        break;
    }
    console.log('setPersistence', { persistenceInput, persistenceResolved });
    this.auth
      .setPersistence(persistenceResolved)
      .catch((error: any) => console.error(error));
  }

  public async HandleAuthLogin(params: { username: string; password: string }) {
    const { username, password } = params;
    console.log('HandleAuthLogin:', params);
    if (username && password) {
      try {
        const user = await this.auth.signInWithEmailAndPassword(
          username,
          password
        );
        console.log('HandleAuthLogin: user sucessfully logged in', { user });
        return user;
      } catch (e) {
        console.log('HandleAuthLogin: invalid credentials', { params });
        throw new Error('Login error: invalid credentials');
      }
    } else {
      const user = await this.getUserLogin();
      const idToken = await user.getIdToken();
      const loginResult = await login({providerToken: idToken});
      
      const {token, user: userInfo } = loginResult.json?.data || {};
      userInfo.token = token;
      localStorage.setItem(AUTH_KEY, JSON.stringify(userInfo));
      Cookies.set(TOKEN_KEY, token, { expires: 1 });
      console.log('UserLogin:', user, loginResult.json.data);
      return user;
    }
  }

  public getLocalUser () {
    try{
      const userStr = localStorage.getItem(AUTH_KEY);
      return JSON.parse(userStr || '');
    }catch(error){ 
      console.log('User format not valid');
    }
    return null;
  }

  public HandleAuthLogout() {
    localStorage.removeItem(AUTH_KEY);
    Cookies.remove(TOKEN_KEY);
    return this.auth.signOut();
  }

  public HandleAuthError(errorHttp: HttpErrorType) {
    console.log('HandleAuthLogin: invalid credentials', { errorHttp });
    const status = !!errorHttp && errorHttp.status;
    const statusTxt = retrieveStatusTxt(status);
    if (statusTxt === 'ok') {
      console.log('API is actually authenticated');
      return Promise.resolve();
    }
    console.warn('Recieved authentication error from API');
    return Promise.reject();
  }

  public async HandleAuthCheck(): Promise<void> {
    return this.getUserLogin() as any; // Prevents breaking change
  }

  public getUserLogin(): Promise<User> {
    return new Promise((resolve, reject) => {
      if (this.auth.currentUser) return resolve(this.auth.currentUser);
      const unsubscribe = this.auth.onAuthStateChanged((user) => {
        // console.log('OnAuthChange:', user);
        unsubscribe();
        if (user) {
          resolve(user);
        } else {
          reject();
        }
      });
    });
  }

  public async HandleGetPermissions() {
    try {
      
      // const user = await this.getUserLogin();
      // // @ts-ignore
      // const token = await user.getIdTokenResult();
      // console.log("Handle get permission: ", token);
      const userLocal = this.getLocalUser();
      // {
      //   roles: ['admin', 'user'],
      // }//this.getLocalUser();
      let permissions = {};
      if(userLocal){
        permissions = userLocal.roles?.reduce((result: any, value: string) => {
          result[value] = true;
          return result;
        }, {})
        
        // Object.assign(token.claims, permissions);
        // console.log("Handle get permission: ", permissions, token.claims);
      }
      return permissions;
    } catch (e) {
      console.log('HandleGetPermission: no user is logged in or tokenResult error', e)
      return null;
    }
  }

  public async HandleGetIdentity(): Promise<UserIdentity> {
    try {
      const { uid, displayName, photoURL } = await this.getUserLogin();
      const identity: UserIdentity = {
        id: uid,
        fullName: displayName + '',
        avatar: photoURL + '',
      };
      return identity;
    } catch (e) {
      console.log('HandleGetIdentity: no user is logged in', {
        e,
      });
      return null as any;
    }
  }

  public async HandleGetJWTAuthTime() {
    try {
      const user = await this.getUserLogin();
      // @ts-ignore
      const token = await user.getIdTokenResult();

      return token.authTime;
    } catch (e) {
      console.log('HandleGetJWTAuthTime: no user is logged in or tokenResult error', {
        e,
      });
      return null;
    }
  }

  public async HandleGetJWTExpirationTime() {
    try {
      const user = await this.getUserLogin();
      // @ts-ignore
      const token = await user.getIdTokenResult();

      return token.expirationTime;
    } catch (e) {
      console.log(
        'HandleGetJWTExpirationTime: no user is logged in or tokenResult error',
        {
          e,
        }
      );
      return null;
    }
  }

  public async HandleGetJWTSignInProvider() {
    try {
      const user = await this.getUserLogin();
      // @ts-ignore
      const token = await user.getIdTokenResult();

      return token.signInProvider;
    } catch (e) {
      console.log(
        'HandleGetJWTSignInProvider: no user is logged in or tokenResult error',
        {
          e,
        }
      );
      return null;
    }
  }

  public async HandleGetJWTIssuedAtTime() {
    try {
      const user = await this.getUserLogin();
      // @ts-ignore
      const token = await user.getIdTokenResult();

      return token.issuedAtTime;
    } catch (e) {
      console.log(
        'HandleGetJWTIssuedAtTime: no user is logged in or tokenResult error',
        {
          e,
        }
      );
      return null;
    }
  }

  public async HandleGetJWTToken() {
    try {
      const user = await this.getUserLogin();
      // @ts-ignore
      const token = await user.getIdTokenResult();
      console.log("Handleget token", token);
      return token.token;

    } catch (e) {
      console.log(
        'HandleGetJWTIssuedAtTime: no user is logged in or tokenResult error',
        {
          e,
        }
      );
      return null;
    }
  }
}

export function FirebaseAuthProvider(
  firebaseConfig: {},
  options: RAFirebaseOptions
): AuthProvider {
  VerifyAuthProviderArgs(firebaseConfig, options);
  // logger.SetEnabled(!!options?.logging);
  const auth = new AuthClient(firebaseConfig, options);

  const provider: AuthProvider = {
    // React Admin Interface
    login: (params: any) => auth.HandleAuthLogin(params),
    logout: () => auth.HandleAuthLogout(),
    checkAuth: () => auth.HandleAuthCheck(),
    checkError: (error: any) => auth.HandleAuthError(error),
    getPermissions: () => auth.HandleGetPermissions(),
    getIdentity: () => auth.HandleGetIdentity(),
    // Custom Functions
    getAuthUser: () => auth.getUserLogin(),
    getJWTAuthTime: () => auth.HandleGetJWTAuthTime(),
    getJWTExpirationTime: () => auth.HandleGetJWTExpirationTime(),
    getJWTSignInProvider: () => auth.HandleGetJWTSignInProvider(),
    getJWTClaims: () => auth.HandleGetPermissions(),
    getJWTToken: () => auth.HandleGetJWTToken(),
  };
  return provider;
}

function VerifyAuthProviderArgs(
  firebaseConfig: {},
  options: RAFirebaseOptions
) {
  const hasNoApp = !options || !options.app;
  const hasNoConfig = !firebaseConfig;
  if (hasNoConfig && hasNoApp) {
    throw new Error(
      'Please pass the Firebase firebaseConfig object or options.app to the FirebaseAuthProvider'
    );
  }
}