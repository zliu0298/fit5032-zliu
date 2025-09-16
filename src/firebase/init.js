import { initializeApp, getApps, getApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-eLe5pie7lBXKVT87_a-sFMI6v3caTz8",
  authDomain: "week7-zihan.firebaseapp.com",
  projectId: "week7-zihan",
  storageBucket: "week7-zihan.appspot.app",
  messagingSenderId: "416664787475",
  appId: "1:416664787475:web:728d785dee4a6159b47de6"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)

const db = getFirestore(app)

export { db }