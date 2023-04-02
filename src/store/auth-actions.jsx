import { authActions } from "./auth";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export const registerUser = (authData, auth) => {
	return async dispatch => {
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				authData.email,
				authData.password
			);
			setUserData(authData, userCredential.user.uid);
			return Promise.resolve();
		} catch (error) {
			return Promise.reject(error.code);
		}
	};
};

export const loginUser = authData => {
	return async dispatch => {
		try {
			const userCredential = await signInWithEmailAndPassword(
				authData.auth,
				authData.email,
				authData.password
			);
			localStorage.setItem("isLoggedIn", true);
			localStorage.setItem("uid", userCredential.user.uid);
			dispatch(
				authActions.authChanger({
					loginState: true,
					uid: userCredential.user.uid,
				})
			);
			return Promise.resolve();
		} catch (error) {
			return Promise.reject(error.code);
		}
	};
};

export const logoutUser = () => {
	return dispatch => {
		localStorage.setItem("isLoggedIn", false);
		localStorage.setItem("uid", "");
		dispatch(
			authActions.authChanger({
				loginState: false,
				uid: "",
			})
		);
	};
};

export const fetchUserAuth = () => {
	return dispatch => {
		const loginState = JSON.parse(localStorage.getItem("isLoggedIn"));
		const uid = localStorage.getItem("uid");
		dispatch(
			authActions.authChanger({
				loginState: loginState,
				uid: uid,
				auth: false,
			})
		);
	};
};

export const setUserData = async (userData, uid) => {
	try {
		await setDoc(doc(db, "users", uid), {
			...userData,
			uid,
		});
	} catch (err) {
		console.log(err);
	}
};