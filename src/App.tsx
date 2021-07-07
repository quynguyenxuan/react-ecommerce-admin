import * as React from 'react';
import { useEffect } from 'react';
import {
  Admin,
  Resource,
  DataProvider,
  AuthProvider,
  usePermissions,
  useGetPermissions,
} from 'react-admin';
import polyglotI18nProvider from 'ra-i18n-polyglot';

import themeReducer from './themeReducer';
import { Login, Layout, NewLogin, FirebaseLogin } from './layout';
import customRoutes from './routes';
import englishMessages from './i18n/en';
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
  authProvider: AuthProvider;
}

const App = (props: AppProps) => {
  const { onUnmount } = props;

  useEffect(() => {
    return onUnmount;
  }, [onUnmount]);

  console.log('App', props);
  
  return (
    <Admin
      title="Web2Mobile Admin"
      dataProvider={props.dataProvider}
      customReducers={{ theme: themeReducer }}
      customRoutes={customRoutes}
      authProvider={props.authProvider}
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
