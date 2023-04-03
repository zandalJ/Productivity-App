import tasks, { tasksActions } from "./tasks";
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase";

export const addTask = data => {
	return async dispatch => {
		const uid = localStorage.getItem("uid");
		const ref = doc(db, "tasks", uid);
		const docSnap = await getDoc(ref);

		if (!docSnap.exists()) {
			console.log("pok");
			await setDoc(ref, {
				tasks: [data],
			});
		} else {
			await updateDoc(ref, {
				tasks: arrayUnion(data),
			});
		}

		dispatch(tasksActions.addTask({ task: data }));
	};
};

export const fetchTasks = () => {
	return async dispatch => {
		const uid = localStorage.getItem("uid");

		const docRef = doc(db, "tasks", uid);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			console.log(docSnap.data());
			dispatch(tasksActions.getTasks({ tasks: docSnap.data() }));
		}
	};
};
