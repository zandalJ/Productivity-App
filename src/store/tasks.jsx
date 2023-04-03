import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
	name: "tasks",
	initialState: { tasks: [] },
	reducers: {
		getTasks(state, action) {
			state.tasks = action.payload.tasks;
		},
		addTask(state, action) {
			state.tasks = state.tasks.push(action.payload.task);
		},
	},
});

export const tasksActions = tasksSlice.actions;
export default tasksSlice.reducer;
