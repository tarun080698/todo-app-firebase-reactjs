import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBeEZUalFU957LYBdgyuF-fyPZH6n0o-nY",
  authDomain: "todolist-react-cp.firebaseapp.com",
  projectId: "todolist-react-cp",
  storageBucket: "todolist-react-cp.appspot.com",
  messagingSenderId: "207279896601",
  appId: "1:207279896601:web:a3a28ed6c31dd189859288",
  measurementId: "G-1K5T4R0FJE",
});

const db = firebaseApp.firestore();

export default db;
