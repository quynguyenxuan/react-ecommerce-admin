import {
  FirebaseDataProvider,
  FirebaseAuthProvider,
} from 'react-admin-firebase';
import { firebaseConfig } from '../utils';

const options = {
  logging: true,
  rootRef: 'root_collection/some_document',
  watch: ['products', 'categories'],
  dontwatch: ['users'],
};

export default () => FirebaseDataProvider(firebaseConfig, options);
