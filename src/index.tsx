import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'proxy-polyfill';
import * as React from 'react';
import ReactDOM from 'react-dom';

import dataProviderFactory from './dataProvider';
import authProviderFactory from './authProvider';
import App from './App';
/**
 * This demo can work with either a fake REST server, or a fake GraphQL server.
 *
 * To avoid bundling both libraries, the dataProvider and fake server factories
 * use the import() function, so they are asynchronous.
 */

if (window.location.href.includes('react-admin-demo')) {
  window.location.href = window.location.href.replace('react-admin-demo', '');
}

const prepareProvider = async () => {
  const restoreFetch = () => {};
  const dataProvider = await dataProviderFactory(
    process.env.REACT_APP_DATA_PROVIDER || ''
  );
  const authProvider = await authProviderFactory(
    process.env.REACT_APP_AUTH_PROVIDER || ''
  );
  console.log(
    'REACT_APP_DATA_PROVIDER:',
    process.env.REACT_APP_DATA_PROVIDER,
    dataProvider
  );
  return { dataProvider, authProvider, restoreFetch };
};

prepareProvider()
  .then(({ dataProvider, authProvider, restoreFetch }) => {
    ReactDOM.render(
      <App
        dataProvider={dataProvider}
        authProvider={authProvider}
        onUnmount={restoreFetch}
      />,
      document.getElementById('root')
    );
  })
  .catch(error => console.error(error));
