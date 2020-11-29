import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyAIuc1_F2XMIHpnhg6WgOLN4iOkP9V-cxk",
    authDomain: "discord-clone-fe489.firebaseapp.com",
    databaseURL: "https://discord-clone-fe489.firebaseio.com",
    projectId: "discord-clone-fe489",
    storageBucket: "discord-clone-fe489.appspot.com",
    messagingSenderId: "21097795475",
    appId: "1:21097795475:web:06b88d4345e20854982266"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;