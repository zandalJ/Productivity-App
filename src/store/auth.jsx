import { createSlice } from "@reduxjs/toolkit";
import { sync } from "framer-motion";

const initialState = {
	isLoggedIn: false,
	uid: "",
	loginError: null,
	registerError: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState: initialState,
	reducers: {
		authChanger(state, action) {
			state.isLoggedIn = action.payload.loginState;
			state.uid = action.payload.uid;
		},
		loginError(state, action) {
			state.loginError = action.payload.error;
		},
		registerError(state, action) {
			state.registerError = action.payload.error;
		},
	},
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
