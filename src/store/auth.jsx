import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isLoggedIn: false,
	uid: "",
};

const authSlice = createSlice({
	name: "auth",
	initialState: initialState,
	reducers: {
		authChanger(state, action) {
			state.isLoggedIn = action.payload.loginState;
			state.uid = action.payload.uid;
		},
	},
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
