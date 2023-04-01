import { authActions } from "./auth";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export const registerUser = (authData, auth) => {
	return async dispatch => {
		await createUserWithEmailAndPassword(
			auth,
			authData.email,
			authData.password
		)
			.then(userCredential => {
				setUserData(authData, userCredential.user.uid);
			})
			.catch(error => {
				dispatch(registerErrorHandler(error.code))
				return error
			});
	};
};

export const loginUser = authData => {
	return async dispatch => {
		await signInWithEmailAndPassword(
			authData.auth,
			authData.email,
			authData.password
		)
			.then(userCredential => {
				localStorage.setItem("isLoggedIn", true);
				localStorage.setItem("uid", userCredential.user.uid);
				dispatch(
					authActions.authChanger({
						loginState: true,
						uid: userCredential.user.uid,
					})
				);
			})
			.catch(error => {
				dispatch(loginErrorHandler(error.code));
			});
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

const loginErrorHandler = error => {
	return dispatch => {
		dispatch(authActions.loginError({ error: error }));
	};
};

const registerErrorHandler = error => {
	return dispatch => {
		dispatch(authActions.registerError({ error }));
	};
};
