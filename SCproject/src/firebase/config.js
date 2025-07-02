// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBHaj4R5wT8uUMntO50sY6KsHkRfO-4Oyc",
  authDomain: "bd-suportclient.firebaseapp.com",
  projectId: "bd-suportclient",
  storageBucket: "bd-suportclient.appspot.com", 
  messagingSenderId: "618581086361",
  appId: "1:618581086361:web:2229e54bfe7eb03075a808"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
