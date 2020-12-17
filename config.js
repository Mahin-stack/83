import firebase from 'firebase';
require ('@firebase/firestore');

var firebaseConfig = {
    apiKey: "AIzaSyBnmmDbxOExEJ4-ubfOLbhAJiqpWT-eG_M",
    authDomain: "booksanta-d1ab6.firebaseapp.com",
    databaseURL: "https://booksanta-d1ab6.firebaseio.com",
    projectId: "booksanta-d1ab6",
    storageBucket: "booksanta-d1ab6.appspot.com",
    messagingSenderId: "378203536268",
    appId: "1:378203536268:web:9b7eabe1fb2db0711b34a9"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();