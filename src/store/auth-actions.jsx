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
	deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, updatePassword, deleteUser } from "firebase/auth";
import anonymousAvatar from "../img/anonymous-avatar.png";
import { toastify } from "../constants/toastify";

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
			toastify("Registered successfully");
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
			toastify("Login successfully");
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
		toastify("Logged out");
	};
};

export const fetchUserAuth = () => {
	return async dispatch => {
		const loginState = JSON.parse(localStorage.getItem("isLoggedIn"));
		const uid = localStorage.getItem("uid");
		dispatch(
			authActions.authChanger({
				loginState: loginState,
				uid: uid,
				auth: false,
			})
		);
		await dispatch(fetchUserData(loginState));
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

export const handleUserTeamMembers = changeData => {
	return async dispatch => {
		const { ref } = await getDocSnap();
		await updateDoc(ref, {
			teamMembers: arrayUnion(...changeData),
		});

		const loginState = JSON.parse(localStorage.getItem("isLoggedIn"));

		dispatch(fetchUserData(loginState));
		const toastifyText =
			changeData.length === 1 ? "Added team member" : "Added team members";
		toastify(toastifyText);
	};
};

export const changeProfileImage = img => {
	return async dispatch => {
		const uid = localStorage.getItem("uid");
		const storage = getStorage();
		const storageRef = ref(storage, `/users/${uid}/avatarUrl`);
		await uploadBytes(storageRef, img);

		const loginState = JSON.parse(localStorage.getItem("isLoggedIn"));
		await dispatch(fetchUserData(loginState));
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
		const toastifyText =
			membersId.lentgh === 1 ? "Deleted team member" : "Deleted team members";
		toastify(toastifyText);
	};
};

const fetchUserAvatar = async () => {
	const storage = getStorage();
	const uid = localStorage.getItem("uid");
	try {
		return await getDownloadURL(ref(storage, `users/${uid}/avatarUrl`));
	} catch (err) {
		// console.log(err);
	}
};

export const fetchUserData = login => {
	return async dispatch => {
		if (login) {
			try {
				const avatarUrl = (await fetchUserAvatar()) || anonymousAvatar;
				const { docSnap } = await getDocSnap();
				const data = docSnap.data();
				await dispatch(
					authActions.userDataHandler({ data: { ...data, avatarUrl } })
				);
				return Promise.resolve();
			} catch (error) {
				return Promise.reject(error);
			}
		} else {
			const anonymousData = {
				name: "Anonymous",
				nickname: "Anonymous",
				teamMembers: [],
				avatarUrl: anonymousAvatar,
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

export const userAuthDataUpdate = (
	data,
	password = false,
	deleteAccount = false
) => {
	return async dispatch => {
		const { ref } = await getDocSnap();
		if (password || deleteAccount) {
			const user = getAuth().currentUser;
			if (password) {
				try {
					await updatePassword(user, data.password);
					return Promise.resolve();
				} catch (error) {
					return Promise.reject(
						"The last login was too long ago, log in again to change your password"
					);
				} finally {
					await updateDoc(ref, {
						...data,
					});
					toastify("Password updated");
				}
			}
			if (deleteAccount) {
				deleteUser(user)
					.then(() => {
						console.log("deleted");
					})
					.catch(error => {
						console.log(error);
					});
				toastify("Account deleted");
			}
		} else {
			await updateDoc(ref, {
				...data,
			});
			toastify("Profile updated");
		}

		if (deleteAccount) {
			dispatch(logoutUser());
			await deleteDoc(ref);
			const loginState = JSON.parse(localStorage.getItem("isLoggedIn"));
			dispatch(fetchUserData(loginState));
		} else {
			const loginState = JSON.parse(localStorage.getItem("isLoggedIn"));
			dispatch(fetchUserData(loginState));
		}
	};
};
