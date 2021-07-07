import { ApolloQueryResult, ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import buildHasuraProvider from 'ra-data-hasura';

// import customBuildFields from './custom-build-fields';
console.log('buildHasuraProvider', buildHasuraProvider);
export default () => {
  return buildHasuraProvider(
    {
      client: new ApolloClient<NormalizedCacheObject>({
        uri: 'http://51.79.140.20:8080/v1/graphql',
        headers: {
          'x-hasura-admin-secret': 'quynguyen',
          // 'x-hasura-access-key': 'quynguyen',
          // 'Authorization': `Bearer xxxx`,
        },
        cache: new InMemoryCache(),
      }),
    }
    // customBuildFields
  );
};
