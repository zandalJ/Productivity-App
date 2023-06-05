import { filterSortingActions } from "./filter-sorting";

export const fetchFilterData = () => {
	let filter, sort;

	return dispatch => {
		filter = localStorage.getItem("filter");
		sort = localStorage.getItem("sort");
		dispatch(
			filterSortingActions.filterChanger({ filter: filter, sort: sort })
		);
	};
};

export const sendFilterData = filters => {
	return dispatch => {
		localStorage.setItem("filter", filters.filter);
		localStorage.setItem("sort", filters.sort);
		dispatch(
			filterSortingActions.filterChanger({
				filter: filters.filter,
				sort: filters.sort,
			})
		);
	};
};
