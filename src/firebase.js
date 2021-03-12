import firebase from "firebase"
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseApp = firebase.initializeApp({
    apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
    authDomain: `${process.env.REACT_APP_POJECT_ID}.firebaseapp.com`,
    projectId: `${process.env.REACT_APP_POJECT_ID}`,
    databaseURL: `https://${process.env.REACT_APP_POJECT_ID}.firebaseio.com`,
    storageBucket: `${process.env.REACT_APP_POJECT_ID}.appspot.com`,
    messagingSenderId: `${process.env.MESSAGING_SENDER_ID}`,
    appId: `${process.env.APP_ID}`,
    measurementId: `${process.env.MEASUREMENT_ID}`
  });

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db,auth,storage};