import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDmGRgeosJBjTCNeb-JpdI9mQgiewh8Ubs",
    authDomain: "diaryapp-e71a3.firebaseapp.com",
    projectId: "diaryapp-e71a3",
    storageBucket: "diaryapp-e71a3.firebasestorage.app",
    messagingSenderId: "482662543850",
    appId: "1:482662543850:web:e24d6a2116263630238293"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
