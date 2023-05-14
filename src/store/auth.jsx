import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isLoggedIn: false,
	uid: "",
	userData: [],
};

const authSlice = createSlice({
	name: "auth",
	initialState: initialState,
	reducers: {
		authChanger(state, action) {
			state.isLoggedIn = action.payload.loginState;
			state.uid = action.payload.uid;
		},
		userDataHandler(state, action) {
			state.userData = action.payload.data
		},
	},
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
