import app from 'firebase/app';
import 'firebase/auth';
// import 'firebase/database';
import 'firebase/firestore';
import 'firebase/storage';


const config = {
    apiKey: "AIzaSyCNOzHkdyYCn_qpg84WjnJQJxRgq7osuDc",
    authDomain: "talent-finder-sk.firebaseapp.com",
    databaseURL: "https://talent-finder-sk.firebaseio.com",
    projectId: "talent-finder-sk",
    storageBucket: "talent-finder-sk.appspot.com",
    messagingSenderId: "500460703826",
    appId: "1:500460703826:web:0a271c699588f7ea214f8b"
  };

  class Firebase {
    constructor() {
      app.initializeApp(config);
      this.auth = app.auth();
      // this.db = app.database();
      this.firestore = app.firestore();
      this.storage = app.storage();

    }
    // *** Auth API ***
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
  this.auth.currentUser.updatePassword(password);

  // *** User API ***
  // user = uid => this.db.ref(`users/${uid}`);
     user = uid => this.firestore.doc(`users/${uid}`);
  // users = () => this.db.ref('users');
     users = () => this.firestore.collection('users');
  
  // *** Projet API ***
     projet = id => this.firestore.doc(`projets/${id}`);
     projets = () => this.firestore.collection('projets');


     uploadTask = (imageName) => this.storage.ref(`images/${imageName}`)
     uploadTaskURL = () => this.storage.ref('images')

  }
  export default Firebase;
  