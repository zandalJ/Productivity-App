import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;

const firebaseConfig = {
	apiKey: API_KEY,
	authDomain: "productivity-app-4f043.firebaseapp.com",
	projectId: "productivity-app-4f043",
	storageBucket: "productivity-app-4f043.appspot.com",
	messagingSenderId: "570201468965",
	appId: "1:570201468965:web:25267d2ec473be00cdcfcc",
	measurementId: "G-FCY9DFHMPS",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
