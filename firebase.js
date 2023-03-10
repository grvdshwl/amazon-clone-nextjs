import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyDRzr6tW9ivyfvc_WkMTwZONEXI9hGeiVk",
  authDomain: "clone-nextjs-28b20.firebaseapp.com",
  projectId: "clone-nextjs-28b20",
  storageBucket: "clone-nextjs-28b20.appspot.com",
  messagingSenderId: "114656539889",
  appId: "1:114656539889:web:1334bbfb74c69db2b76550",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore();

export default db;
