export * from './authProvider';
export default (type: string) => {
  switch (type) {
    case 'custom':
      return import('./authProvider').then(factory => factory.default());
    case 'firebase':
      return import('./firebaseProvider').then(factory => factory.default());
    default:
      return import('./firebaseProvider').then(factory => factory.default());
  }
};
