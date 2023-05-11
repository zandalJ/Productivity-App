import { habitsActions } from "./habits";
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase";
import moment from "moment";

const getDocSnap = async () => {
	const uid = localStorage.getItem("uid");
	const ref = doc(db, "habits", uid);
	const docSnap = await getDoc(ref);
	return { ref, docSnap };
};

export const fetchHabits = () => {
	return async dispatch => {
		const { docSnap } = await getDocSnap();

		if (docSnap.exists()) {
			const data = docSnap.data().habits;
			if (docSnap.data().hasOwnProperty("habits")) {
				dispatch(habitsActions.getHabits({ habits: data }));
			}
		}
	};
};

export const addHabit = data => {
	return async dispatch => {
		const { ref, docSnap } = await getDocSnap();

		if (!docSnap.exists()) {
			await setDoc(ref, {
				habits: [data],
			});
		} else {
			await updateDoc(ref, {
				habits: arrayUnion(data),
			});
		}

		dispatch(fetchHabits());
	};
};

export const updateHabit = (data, habitId, goal = false) => {
	return async dispatch => {
		const { ref, docSnap } = await getDocSnap();
		const habits = docSnap.data().habits;
		const updatedHabits = habits.map(habit => {
			if (habit.id === habitId) {
				if (goal) {
					const { goal, days, ...rest } = habit;
					return {
						...rest,
						goal: { ...goal, ...data.goal },
						days: [...data.days],
					};
				} else {
					return { ...habit, ...data };
				}
			} else {
				return habit;
			}
		});
		await updateDoc(ref, {
			habits: updatedHabits,
		});

		dispatch(fetchHabits());
	};
};

export const resetHabitValue = habitId => {
	return async dispatch => {
		const { ref, docSnap } = await getDocSnap();
		const habits = docSnap.data().habits;
		const currentDate = moment().format("DD-MM-YYYY");
		const updatedHabits = habits.map(habit => {
			if (habit.id === habitId) {
				const resetDays = habit.days.map((day, index) => {
					if (index === habit.days.length - 1) {
						return { date: day.date, ratio: "0" };
					} else {
						return day;
					}
				});

				const resetCurrentValue = {
					...habit.goal,
					currentValue: 0,
				};

				return { ...habit, days: resetDays, goal: resetCurrentValue };
			} else {
				return habit;
			}
		});
		await updateDoc(ref, {
			habits: updatedHabits,
		});

		dispatch(fetchHabits());
	};
};

export const addHabitsToNewDay = habits => {
	return async dispatch => {
		const { ref } = await getDocSnap();
		const currentDate = moment().format("DD-MM-YYYY");
		const newDayHabits = habits.map(habit => {
			const { days, goal, ...rest } = habit;
			return {
				...rest,
				days: [...days, { date: currentDate, ratio: "0" }],
				goal: { ...goal, currentValue: 0 },
			};
		});

		await updateDoc(ref, {
			habits: newDayHabits,
		});

		dispatch(fetchHabits());
	};
};
