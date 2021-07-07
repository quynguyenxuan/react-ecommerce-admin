export default (type: string) => {
  switch (type) {
    case 'graphql':
      return import('./graphql').then(factory => factory.default());
    case 'hasura':
      return import('./hasura').then(factory => factory.default());
    case 'firebase':
      return import('./firebase').then(factory => factory.default());
    default:
      return import('./rest').then(provider => provider.default);
  }
};
