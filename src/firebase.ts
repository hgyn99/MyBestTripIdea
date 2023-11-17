import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBHE9MrDjpC8GyxSftz0z4pMg9IK8s2N24",
  authDomain: "nwitter-reloaded-608b3.firebaseapp.com",
  projectId: "nwitter-reloaded-608b3",
  storageBucket: "nwitter-reloaded-608b3.appspot.com",
  messagingSenderId: "639801343641",
  appId: "1:639801343641:web:146f2672f748ef75844208",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);
