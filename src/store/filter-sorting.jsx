import { createSlice } from "@reduxjs/toolkit";

const initiialState = { filter: "all", sort: "ca", isChanged:false};

const filterSortingSlice = createSlice({
	name: "filter sorting",
	initialState: initiialState,
	reducers: {
		filterChanger(state, action) {
			state.filter = action.payload.filter 
			state.sort = action.payload.sort 
			state.isChanged=true
		},
	},
});

export const filterSortingActions = filterSortingSlice.actions;
export default filterSortingSlice.reducer;
