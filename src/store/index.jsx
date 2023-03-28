import { configureStore } from "@reduxjs/toolkit";
import mainColorReducer from "./main-color";
import filterSortingReducer from "./filter-sorting";
import authReducer from "./auth";

const store = configureStore({
	reducer: {
		mainColor: mainColorReducer,
		filterSorting: filterSortingReducer,
		auth: authReducer,
	},
});

export default store;
