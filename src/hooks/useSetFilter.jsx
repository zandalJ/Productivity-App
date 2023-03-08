import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { filterSortingActions } from "../store/filter-sorting";
const useSetFilter = (elements = [], sort = "ca", filter = "all") => {
	const dispatch = useDispatch();
	const [event, setEvent] = useState();
	const eventHandler = e => setEvent(e);
	useEffect(() => {
		if (event) {
			let currentEl = elements.current.find(
				element => element.className === event.target.className
			);

			currentEl.checked = true;

			if (event.target.dataset.type === "filter") {
				dispatch(
					filterSortingActions.filterChanger({
						filter: currentEl.value,
						sort: sort,
					})
				);
			}

			if (event.target.dataset.type === "sort") {
				dispatch(
					filterSortingActions.filterChanger({
						filter: filter,
						sort: currentEl.value,
					})
				);
			}
		}
	}, [event, elements, sort, dispatch, filter]);

	return { setFilterEvent: eventHandler };
};

export default useSetFilter;
