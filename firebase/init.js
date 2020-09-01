import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import "firebase/storage";
import "firebase/messaging";

// Fill this in with your firebase details
var config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

!firebase.apps.length ? firebase.initializeApp(config) : "";

export const auth = firebase.auth();
export const persistencetype = firebase.auth.Auth.Persistence.LOCAL;

//Comment this out if not using local emulator
// firebase.firestore().settings({
//   host: "localhost:8080",
//   ssl: false,
// });

//Specify the link to firestoreDB collection that you will be using, feel free to change, add, delete.
export const firestoreDB = firebase.firestore().collection("users").doc("users");

export const storage = firebase.app().storage("gs://YOUR_BUCKET_HERE");
// export const messaging = firebase.messaging();
// // Set VAPID KEY
// messaging.usePublicVapidKey(
//   "BDYE2EYHdIp8qHjTKcJYPvO4PgaAH2pSruP55FOtNs5jWsgdeg7YK6OgJ0daSu21kN7aSzU19NRXRqC4bfITZYQ"
// );
export default firebase;
