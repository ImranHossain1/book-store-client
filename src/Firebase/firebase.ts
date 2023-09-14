import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyA8PAA0r-M0dt058jPiaxAf8EVMFNkJQCI',
  authDomain: 'book-store-142c4.firebaseapp.com',
  projectId: 'book-store-142c4',
  storageBucket: 'book-store-142c4.appspot.com',
  messagingSenderId: '979065523811',
  appId: '1:979065523811:web:4c574db159848bb9e03256',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
