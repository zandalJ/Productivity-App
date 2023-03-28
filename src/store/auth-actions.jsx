import { authActions } from "./auth";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export const registerUser = authData => {
	return async dispatch => {
		try {
			await createUserWithEmailAndPassword(
				authData.auth,
				authData.email,
				authData.password
			).then(userCredential => {
				dispatch(
					authActions.authChanger({
						loginState: false,
						uid: userCredential.user.uid,
					})
				);
			});
		} catch (err) {
			console.log(err);
		}
	};
};

export const loginUser = authData => {
	return async dispatch => {
		await signInWithEmailAndPassword(
			authData.auth,
			authData.email,
			authData.password
		).then(userCredential => {
			dispatch(
				authActions.authChanger({
					loginState: true,
					uid: userCredential.user.uid,
				})
			);
		});
	};
};

export const setUserData = (userData, uid) => {
    console.log(uid);
	return async (dispatch) => {
		try {
			await setDoc(doc(db, "users", uid), {
				...userData,
			});
		} catch (err) {
			console.log(err);
		}
	};
};



