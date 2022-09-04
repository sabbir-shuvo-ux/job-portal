import app from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
      apiKey: "AIzaSyDddBd9s8MYckfF3ja4pEUpLHalju3rJk8",
      authDomain: "job-portal-6203d.firebaseapp.com",
      projectId: "job-portal-6203d",
      storageBucket: "job-portal-6203d.appspot.com",
      messagingSenderId: "730474852927",
      appId: "1:730474852927:web:992cc954ea3e0510cc3e8a"
};
    
    
// Initialize Firebase

const firebase = app.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

export { firebase, firestore, app }