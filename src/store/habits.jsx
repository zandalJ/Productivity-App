import { createSlice } from "@reduxjs/toolkit";

const habitsSlice = createSlice({
	name: "habits",
	initialState: { habits: [] },
	reducers: {
		getHabits(state, action) {
			state.habits = action.payload.habits;
		},
		addHabits(state, action) {
			state.habits = state.habits.push(action.payload.habit);
		},
	},
});

export const habitsActions = habitsSlice.actions;
export default habitsSlice.reducer;
