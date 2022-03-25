import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: 'AIzaSyDB4aegP7WolHHl-9F13LVYeGyRxcnmPMQ',
  authDomain: 'the-time-trader.firebaseapp.com',
  projectId: 'the-time-trader',
  storageBucket: 'the-time-trader.appspot.com',
  messagingSenderId: '465711465294',
  appId: '1:465711465294:web:83f2c256a927b8a29e941f',
  measurementId: 'G-6QZQZJ88QQ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
