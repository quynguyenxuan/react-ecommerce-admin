import { FirebaseAuthProvider } from './firebaseAuthProvider';
import firebase from 'firebase/app';
import { firebaseConfig } from '../utils';

// Initialize Firebase
const firebaseApp = firebase.apps.length < 1 
  ? firebase.initializeApp(firebaseConfig) 
  : firebase.apps[0];

export const authProvider = FirebaseAuthProvider(firebaseConfig, {
  logging: true,
  app: firebaseApp,
  persistence: 'local',
  // disableMeta: true
  dontAddIdFieldToDoc: true,
  lazyLoading: {
    enabled: true,
  },
});
