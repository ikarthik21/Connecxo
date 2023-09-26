import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCH95Tov7dRP4AOBqfH42E0vrQog-oxwnE",
    authDomain: "connecxo.firebaseapp.com",
    projectId: "connecxo",
    storageBucket: "connecxo.appspot.com",
    messagingSenderId: "911530003034",
    appId: "1:911530003034:web:8fa8a991d6af0a5e212663",
    measurementId: "G-TTH5X8LG5G"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
export const storage = getStorage(app);
