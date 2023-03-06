import { configureStore } from "@reduxjs/toolkit";
import mainColorReducer from "./main-color";
import filterSortingReducer from "./filter-sorting";

const store = configureStore({
	reducer: { mainColor: mainColorReducer, filterSorting: filterSortingReducer },
});

export default store;
