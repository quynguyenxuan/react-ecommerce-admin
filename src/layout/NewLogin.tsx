import React, {useState} from 'react';
import { Login, LoginForm, useLogin, useNotify } from 'react-admin';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import ForgotPasswordButton from './ForgotPassword';
import { CircularProgress } from '@material-ui/core';



const handleFirebaseUICallback = (ui: firebaseui.auth.AuthUI) => {
  console.log('handle firebase ui callback:', ui);
  ui.disableAutoSignIn();
};

const SignInScreen = (props: any) => {
  const {loading, setLoading} = props;
  const login = useLogin();
  
  const notify = useNotify();
  // Configure FirebaseUI.
const uiConfig: firebaseui.auth.Config = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '#/',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccessWithAuthResult: (result: any) => {
      console.log('sign in success with auth result:', result);
      const { user } = result || {};
      if (!user) {
        return false;
      }
      setLoading(true);
      login({}).catch(
        (error: Error) => {
            setLoading(false);
            notify(
                typeof error === 'string'
                    ? error
                    : typeof error === 'undefined' || !error.message
                    ? 'ra.auth.sign_in_error'
                    : error.message,
                'warning',
                {
                    _:
                        typeof error === 'string'
                            ? error
                            : error && error.message
                            ? error.message
                            : undefined,
                }
            );
        }
    );;
  
      // const idToken = await user.getIdToken();
      // console.log('firebase id token:', idToken);
      // dispatch({
      //   type: 'user/login',
      //   payload: {
      //     providerToken: idToken,
      //   },
      // });
      return false;
    },
  },
};
  return(
    <StyledFirebaseAuth
      uiConfig={uiConfig}
      firebaseAuth={firebase.auth()}
      uiCallback={handleFirebaseUICallback}
    />
  );
  }

const CustomLoginForm = (props: any) => {
  const [loading, setLoading] = useState(false);
  return (
    <div>
      {/* <div style={{fontFamily: "monospace", marginLeft: '15px'}}> */}
      {/* <p>Username: test@example.com</p>
        <p>Password: password</p> */}
      {/* </div> */}
      {/* <LoginForm {...props} /> */}
      {loading && <div style={{display: 'flex', justifyContent: 'center', padding: 10, width: '100%'}}>
        <CircularProgress disableShrink />
      </div>}
      {!loading && <ForgotPasswordButton {...props} />}
      <SignInScreen setLoading={setLoading} loading={loading}/>
    </div>
  );
};

const CustomLoginPage = (props: any) => (
  <Login {...props}>
    <CustomLoginForm {...props} />
  </Login>
);

export default CustomLoginPage;
