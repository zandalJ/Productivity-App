import { tasksActions } from "./tasks";
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase";
import moment from "moment";
import { toastify } from "../constants/toastify";

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
		toastify("Task added successfully");

		dispatch(fetchTasks());
	};
};

export const fetchTasks = () => {
	return async dispatch => {
		const { ref, docSnap } = await getDocSnap();
		if (docSnap.exists()) {
			const data = docSnap.data().tasks;
			if (docSnap.data().hasOwnProperty("tasks")) {
				data.forEach((task, index) => {
					let serializedUpdateTimestamp;
					const serializedDeadlineTimestamp = moment(
						task.deadline.toDate().toISOString()
					).format();
					const serializedCreateTimestamp = moment(
						task.createDate.toDate().toISOString()
					).format();
					if (data.updateDate) {
						serializedUpdateTimestamp = moment(
							task.updateDate.toDate().toISOString()
						).format();
					}
					data[index].deadline = serializedDeadlineTimestamp;
					data[index].createDate = serializedCreateTimestamp;
					data[index].updateDate = serializedUpdateTimestamp;
				});
				dispatch(tasksActions.getTasks({ tasks: data }));
			}
		} else {
			await setDoc(ref, {
				tasks: [],
			});
		}
	};
};

export const updateTask = (data, taskId, single = false) => {
	return async dispatch => {
		const { ref, docSnap } = await getDocSnap();
		const tasks = await docSnap.data().tasks;
		const updatedTasks = tasks.map(task => {
			if (task.id === taskId) {
				return { ...task, ...data };
			} else {
				return task;
			}
		});
		await updateDoc(ref, {
			tasks: updatedTasks,
		});
		dispatch(fetchTasks());
		if (!single) toastify("Task updated successfully");
	};
};

export const getTasksHabitsInfo = () => {
	return async dispatch => {
		const { docSnap } = await getDocSnap();
		const today = moment();

		const serializedCurrentTimestamp = moment(
			today,
			"ddd MMM DD YYYY HH:mm:ss [GMT]ZZ"
		).format();

		const past7DaysDate = moment(serializedCurrentTimestamp)
			.subtract(7, "days")
			.format();

		const past14DaysDate = moment(serializedCurrentTimestamp)
			.subtract(14, "days")
			.format();

		let currentWeekTasks = [];
		let currentWeekCompletedTasks = [];
		let lastWeekTasks = [];
		let lastWeekCompletedTasks = [];
		let allTasks = [];
		let allCompletedTasks = [];

		if (docSnap.exists()) {
			const tasks = await docSnap.data().tasks;
			allTasks = [...tasks];
			tasks.forEach(task => {
				const serializedCreateTimestamp = moment(
					task.createDate.toDate().toISOString()
				).format();

				if (serializedCreateTimestamp >= past7DaysDate) {
					currentWeekTasks.push(task);
				} else if (
					serializedCreateTimestamp >= past14DaysDate &&
					serializedCreateTimestamp < past7DaysDate
				) {
					lastWeekTasks.push(task);
				}

				if (task.status === "completed") {
					allCompletedTasks.push(task);
				}
			});
		}

		if (currentWeekTasks.length > 0) {
			currentWeekTasks.forEach(task => {
				if (task.status === "completed") {
					currentWeekCompletedTasks.push(task);
				}
			});
		}

		if (lastWeekTasks.length > 0) {
			lastWeekTasks.forEach(task => {
				if (task.status === "completed") {
					lastWeekCompletedTasks.push(task);
				}
			});
		}

		const newTaskPercentageHandler = () => {
			if (lastWeekTasks.length > 0) {
				const allTasks = currentWeekTasks.length + lastWeekTasks.length;
				return (currentWeekTasks.length / allTasks) * 100;
			} else {
				return currentWeekTasks.length * 100;
			}
		};

		const taskCompletedPercentageHandler = () => {
			if (lastWeekCompletedTasks.length > 0) {
				const allTasks =
					currentWeekCompletedTasks.length + lastWeekCompletedTasks.length;
				return (currentWeekCompletedTasks.length / allTasks) * 100;
			} else {
				return currentWeekCompletedTasks.length * 100;
			}
		};

		return {
			taskCompleted: {
				count: currentWeekCompletedTasks.length,
				percentage: taskCompletedPercentageHandler(),
			},
			newTasks: {
				count: currentWeekTasks.length,
				percentage: newTaskPercentageHandler(),
			},
			allTasks,
			allCompletedTasks,
		};
	};
};
