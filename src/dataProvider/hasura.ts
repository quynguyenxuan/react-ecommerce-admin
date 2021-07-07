import { ApolloQueryResult, ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import buildHasuraProvider from 'ra-data-hasura';

// import customBuildFields from './custom-build-fields';
console.log('buildHasuraProvider', buildHasuraProvider);
export default () => {
  return buildHasuraProvider(
    {
      client: new ApolloClient<NormalizedCacheObject>({
        uri: 'http://localhost:8083/v1/graphql',
        headers: {
          'x-hasura-admin-secret': 'quynguyen',
          'content-type': 'application/json'
          // 'x-hasura-access-key': 'quynguyen',
          // 'Authorization': `Bearer xxxx`,
        },
        cache: new InMemoryCache(),
      }),
    }
    // customBuildFields
  );
};
