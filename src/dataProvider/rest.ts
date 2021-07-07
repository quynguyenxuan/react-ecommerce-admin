// import simpleRestProvider from 'ra-data-simple-rest';

// const restProvider = simpleRestProvider('http://localhost:4000');

// const delayedDataProvider = new Proxy(restProvider, {
//     get: (target, name, self) =>
//         name === 'then' // as we await for the dataProvider, JS calls then on it. We must trap that call or else the dataProvider will be called with the then method
//             ? self
//             : (resource: string, params: any) =>
//                   new Promise(resolve =>
//                       setTimeout(
//                           () =>
//                               resolve(
//                                   restProvider[name as string](resource, params)
//                               ),
//                           500
//                       )
//                   ),
// });

// export default delayedDataProvider;
import { fetchUtils, HttpError } from 'react-admin';
import crudProvider from './ra-nestjs-provider';
import Cookies from 'js-cookie';
import { TOKEN_KEY } from '../utils';

export const httpClient = (url: any, options: any = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  try {
    const token = Cookies.get(TOKEN_KEY);
    options.headers.set('Authorization', `Bearer ${token}`);
  } catch (error) {}
  const requestHeaders = fetchUtils.createHeadersFromOptions(options);

  return fetch(url, { ...options, headers: requestHeaders })
    .then(response =>
      response.text().then(text => ({
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        body: text,
      }))
    )
    .then(({ status, statusText, headers, body }) => {
      let json;
      try {
        json = JSON.parse(body);
      } catch (e) {
        // not json, no big deal
      }
      if (status < 200 || status >= 300) {
        console.log('JsonResponse: ', json, status, json);
        return Promise.reject(
          new HttpError((json && json.error && json.error.message && `${json.error.error}: ${json.error.message}`) || statusText, status, json)
        );
      }
      return Promise.resolve({ status, headers, body, json });
    });
};

const dataProvider = crudProvider(
  `${process.env.REACT_APP_API_URL}/convert` ||
    'https://app-web2mobile-api.herokuapp.com/convert',
  httpClient
);
export default dataProvider;
