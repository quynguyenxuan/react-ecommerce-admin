import * as React from 'react';
import { useEffect } from 'react';
import {
  Admin,
  Resource,
  DataProvider,
  usePermissions,
  useGetPermissions,
} from 'react-admin';
import polyglotI18nProvider from 'ra-i18n-polyglot';

// import { authProvider } from './authProvider';
import themeReducer from './themeReducer';
import { Login, Layout, NewLogin, FirebaseLogin } from './layout';
// import { Dashboard } from './dashboard';
import customRoutes from './routes';
import englishMessages from './i18n/en';
import {
  FirebaseDataProvider,
  FirebaseAuthProvider,
} from 'react-admin-firebase';
// import { firebaseConfig } from './authProvider';
import products from './products';

import {
  COLLECTION_PRODUCT,
  firebaseConfig,
} from './utils';
import Dashboard from './dashboard/Dashboard';

const i18nProvider = polyglotI18nProvider(locale => {
  if (locale === 'vi') {
    return import('./i18n/vi').then(messages => messages.default);
  }

  // Always fallback on english
  return englishMessages;
}, 'en');

interface AppProps {
  onUnmount: () => void;
  dataProvider: DataProvider;
}

const App = (props: AppProps) => {
  const { onUnmount } = props;

  useEffect(() => {
    return onUnmount;
  }, [onUnmount]);

  console.log('App', props);
  const options = {
    logging: true,
    rootRef: 'root_collection/some_document',
    watch: ['products', 'categories'],
    dontwatch: ['users']
  };
  const dataProvider = FirebaseDataProvider(firebaseConfig, options);
  const authProvider = FirebaseAuthProvider(firebaseConfig, options);
  return (
    <Admin
      title="Web2Mobile Admin"
      dataProvider={dataProvider}
      customReducers={{ theme: themeReducer }}
      customRoutes={customRoutes}
      authProvider={authProvider}
      dashboard={Dashboard}
      loginPage={FirebaseLogin}
      layout={Layout}
      i18nProvider={i18nProvider}
      disableTelemetry
    >
      {pers => [<Resource name={COLLECTION_PRODUCT} {...products(pers)} />]}
    </Admin>
  );
};

export default App;
