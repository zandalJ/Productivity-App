import { filterSortingActions } from "./filter-sorting";

export const fetchFilterData = () => {
	return async dispatch => {
		const fetchData = async () => {
			const response = await fetch(
				"https://productivity-app-4f043-default-rtdb.europe-west1.firebasedatabase.app/filters.json"
			);

			if (!response.ok) {
				// console.log("filter error");
			}

			const data = await response.json();

			return data;
		};

		try {
			const filterData = await fetchData();
			dispatch(
				filterSortingActions.filterSorting({
					filter: filterData.filter,
					sort: filterData.sort,
				})
			);
		} catch (error) {
			// console.log("error");
		}
	};
};

export const sendFilterData = filters => {
	return async dispatch => {
		const sendRequest = async () => {
			const response = await fetch(
				"https://productivity-app-4f043-default-rtdb.europe-west1.firebasedatabase.app/filters.json",
				{
					method: "PUT",
					body: JSON.stringify({
						filter: filters.filter,
						sort: filters.sort,
					}),
				}
			);
			if (!response.ok) {
				console.log("error");
			}
		};

		try {
			await sendRequest();
		} catch (error) {
			console.log(error);
		}
	};
};
