import { habitsActions } from "./habits";
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase";

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
					const { goal, ...rest } = habit;
					return { ...rest, goal: { ...goal, ...data } };
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
		const updatedHabits = habits.map(habit => {
			if (habit.id === habitId) {
				return { ...habit, goal: { ...habit.goal, currentValue: 0 } };
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
