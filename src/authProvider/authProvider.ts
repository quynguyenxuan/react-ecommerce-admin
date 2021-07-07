import { FirebaseAuthProvider } from './firebaseAuthProvider';
import firebase from 'firebase/app';
import { firebaseConfig } from '../utils';

// Initialize Firebase

export default () => {
  const firebaseApp =
    firebase.apps.length < 1
      ? firebase.initializeApp(firebaseConfig)
      : firebase.apps[0];

  return FirebaseAuthProvider(firebaseConfig, {
    logging: true,
    app: firebaseApp,
    persistence: 'local',
    // disableMeta: true
    dontAddIdFieldToDoc: true,
    lazyLoading: {
      enabled: true,
    },
  });
};
