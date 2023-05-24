import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import 'firebase/compat/app-check';

const firebaseConfig = {
  apiKey: 'AIzaSyDtRAy1lEl3reZ1XKZxxd2QjmdamzVhzM8',
  authDomain: 'my-doctor-b1b1a.firebaseapp.com',
  projectId: 'my-doctor-b1b1a',
  storageBucket: 'my-doctor-b1b1a.appspot.com',
  messagingSenderId: '401904044520',
  appId: '1:401904044520:web:dcc4927ecd6c7a03ddbc5d',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
