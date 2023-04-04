import tasks, { tasksActions } from "./tasks";
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase";
import moment from "moment";

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

		dispatch(fetchTasks())
	};
};

export const fetchTasks = () => {
	return async dispatch => {
		const uid = localStorage.getItem("uid");

		const docRef = doc(db, "tasks", uid);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			const data = docSnap.data().tasks;
			data.forEach((task, index) => {
				const serializedTimestamp = moment(
					task.deadline.toDate().toISOString()
				).format();
				data[index].deadline = serializedTimestamp;
			});
			dispatch(tasksActions.getTasks({ tasks: data }));
		}
	};
};
