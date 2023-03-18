import { filterSortingActions } from "./filter-sorting";

export const fetchFilterData = () => {
	let filter, sort;

	return dispatch => {
		try {
			filter = localStorage.getItem("filter");
			sort = localStorage.getItem("sort");
		} catch (error) {
			console.log(error);
		} finally {
			dispatch(
				filterSortingActions.filterChanger({ filter: filter, sort: sort })
			);
		}
	};
};

export const sendFilterData = filters => {
	return dispatch => {
		try {
			localStorage.setItem("filter", filters.filter);
			localStorage.setItem("sort", filters.sort);
		} catch (error) {
			console.log(error);
		}
	};
};
