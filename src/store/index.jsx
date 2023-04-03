import { configureStore } from "@reduxjs/toolkit";
import mainColorReducer from "./main-color";
import filterSortingReducer from "./filter-sorting";
import authReducer from "./auth";
import tasksReducer from "./tasks";

const store = configureStore({
	reducer: {
		mainColor: mainColorReducer,
		filterSorting: filterSortingReducer,
		auth: authReducer,
		tasks: tasksReducer,
	},
});

export default store;
