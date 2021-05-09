import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyDVG8Epmg6lt9XoNICyufx7nVcDMSVP7Q8",
    authDomain: "myapp-86d0d.firebaseapp.com",
    databaseURL: "https://myapp-86d0d-default-rtdb.firebaseio.com",
    projectId: "myapp-86d0d",
    storageBucket: "myapp-86d0d.appspot.com",
    messagingSenderId: "591688338732",
    appId: "1:591688338732:web:e6276bcece5608b29ef089"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();
