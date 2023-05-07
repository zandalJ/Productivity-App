import { configureStore } from "@reduxjs/toolkit";
import mainColorReducer from "./main-color";
import filterSortingReducer from "./filter-sorting";
import authReducer from "./auth";
import tasksReducer from "./tasks";
import habitsReducer from "./habits";

const store = configureStore({
	reducer: {
		mainColor: mainColorReducer,
		filterSorting: filterSortingReducer,
		auth: authReducer,
		tasks: tasksReducer,
		habits: habitsReducer,
	},
});

export default store;
