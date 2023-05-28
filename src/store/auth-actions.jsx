import { authActions } from "./auth";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";
import {
	setDoc,
	doc,
	getDoc,
	arrayUnion,
	updateDoc,
	collection,
	getDocs,
} from "firebase/firestore";
import { db } from "../firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const getDocSnap = async () => {
	const uid = localStorage.getItem("uid");
	const ref = doc(db, "users", uid);
	const docSnap = await getDoc(ref);
	return { ref, docSnap, uid };
};

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
		dispatch(fetchUserData(loginState));
	};
};

export const setUserData = async (userData, uid) => {
	try {
		const storage = getStorage();
		const storageRef = ref(storage, `/users/${uid}/avatarUrl`);
		await setDoc(doc(db, "users", uid), {
			...userData,
			uid,
		});
		uploadBytes(storageRef, userData.avatarUrl);
	} catch (err) {
		console.log(err);
	}
};

export const changeUserData = changeData => {
	return async dispatch => {
		const { ref } = await getDocSnap();
		await updateDoc(ref, {
			teamMembers: arrayUnion(...changeData),
		});

		const loginState = JSON.parse(localStorage.getItem("isLoggedIn"));

		dispatch(fetchUserData(loginState));
	};
};

export const changeProfileImage = img => {
	return async dispatch => {
		const uid = localStorage.getItem("uid");
		const storage = getStorage();
		const storageRef = ref(storage, `/users/${uid}/avatarUrl`);
		uploadBytes(storageRef, img);
		fetchUserAvatar();
	};
};

export const deleteTeamMembers = membersId => {
	return async dispatch => {
		const { ref, docSnap } = await getDocSnap();
		const teamMembers = docSnap.data().teamMembers;
		const updatedMembers = teamMembers.filter(member => {
			for (let i = 0; i < teamMembers.length; i++) {
				if (member.id === membersId[i]) {
					return false;
				}
			}
			return true;
		});

		await updateDoc(ref, {
			teamMembers: updatedMembers,
		});

		const loginState = JSON.parse(localStorage.getItem("isLoggedIn"));
		dispatch(fetchUserData(loginState));
	};
};

const fetchUserAvatar = async () => {
	const storage = getStorage();
	const uid = localStorage.getItem("uid");
	try {
		const url = await getDownloadURL(ref(storage, `users/${uid}/avatarUrl`));
		return url;
	} catch (err) {
		console.log(err);
	}
};

const fetchUserData = login => {
	return async dispatch => {
		if (login) {
			const avatarUrl = await fetchUserAvatar();
			const { docSnap } = await getDocSnap();
			const data = docSnap.data();
			dispatch(authActions.userDataHandler({ data: { ...data, avatarUrl } }));
		} else {
			const anonymousData = {
				name: "Anonymous",
				nickname: "Anonymous",
				teamMembers: [],
			};
			dispatch(authActions.userDataHandler({ data: anonymousData }));
		}
	};
};

export const getAllUsers = async () => {
	const currentUid = localStorage.getItem("uid");
	const querySnapshot = await getDocs(collection(db, "users"));
	const usersArray = [];
	querySnapshot.forEach(doc => {
		const { name, surname, nickname, email, teamMembers, uid, avatarUrl } =
			doc.data();
		if (uid !== currentUid) {
			usersArray.push({
				name,
				surname,
				nickname,
				email,
				teamMembers,
				id: uid,
				avatarUrl,
			});
		}
	});
	return usersArray;
};
