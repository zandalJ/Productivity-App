import { createSlice } from "@reduxjs/toolkit";

const initialState = { openModal: false };

const modalSettingsSlice = createSlice({
	name: "settings modal",
	initialState: initialState,
	reducers: {
		modalStateToggler(state) {
			state.openModal = !state.openModal;
		},
		modalStateChanger(state, action) {
			state.openModal = action.payload;
		},
	},
});

export const modalSettingsActions = modalSettingsSlice.actions;
export default modalSettingsSlice.reducer;
