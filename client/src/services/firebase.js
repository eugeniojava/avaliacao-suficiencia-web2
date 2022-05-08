import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDVM7xlxwnmsToXRDeVKeU6-2Blwfg3k28',
  authDomain: 'my-posts-680c6.firebaseapp.com',
  projectId: 'my-posts-680c6',
  storageBucket: 'my-posts-680c6.appspot.com',
  messagingSenderId: '380698911315',
  appId: '1:380698911315:web:93466235908bd5b909dca6',
};

const firebase = initializeApp(firebaseConfig);

export const storage = getStorage(firebase);
