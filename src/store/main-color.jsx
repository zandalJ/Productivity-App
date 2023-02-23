import { createSlice } from "@reduxjs/toolkit";

const mainColorSlice = createSlice({
	name: "main color",
	initialState: { color: true },
	reducers: {
		colorChanger(state) {
			state.color = !state.color;
		},
	},
});

export const colorActions = mainColorSlice.actions;
export default mainColorSlice.reducer;

// color: true = white
// color : false = black
