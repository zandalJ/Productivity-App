import { tasksActions } from "./tasks";
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase";
import moment from "moment";

const getDocSnap = async () => {
	const uid = localStorage.getItem("uid");
	const ref = doc(db, "tasks", uid);
	const docSnap = await getDoc(ref);
	return { ref, docSnap };
};

export const addTask = data => {
	return async dispatch => {
		const { ref, docSnap } = await getDocSnap();

		if (!docSnap.exists()) {
			await setDoc(ref, {
				tasks: [data],
			});
		} else {
			await updateDoc(ref, {
				tasks: arrayUnion(data),
			});
		}

		dispatch(fetchTasks());
	};
};

export const fetchTasks = () => {
	return async dispatch => {
		const { docSnap } = await getDocSnap();

		if (docSnap.exists()) {
			const data = docSnap.data().tasks;
			if (docSnap.data().hasOwnProperty("tasks")) {
				data.forEach((task, index) => {
					const serializedDeadlineTimestamp = moment(
						task.deadline.toDate().toISOString()
					).format();
					const serializedCreateTimestamp = moment(
						task.createDate.toDate().toISOString()
					).format();
					data[index].deadline = serializedDeadlineTimestamp;
					data[index].createDate = serializedCreateTimestamp;
				});
				dispatch(tasksActions.getTasks({ tasks: data }));
			}
		}
	};
};

export const changeTaskStatus = taskId => {
	return async dispatch => {
		const { ref, docSnap } = await getDocSnap();
		const tasks = docSnap.data().tasks;
		const updatedTasks = tasks.map(task => {
			if (task.id === taskId) {
				return { ...task, status: "completed" };
			} else {
				return task;
			}
		});

		await updateDoc(ref, {
			tasks: updatedTasks,
		});

		dispatch(fetchTasks());
	};
};

