import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { filterSortingActions } from "../store/filter-sorting";
const useSetFilter = (elements = [], sort = "ca") => {
	const dispatch = useDispatch();
	const [event, setEvent] = useState();
	const eventHandler = e => setEvent(e);

	useEffect(() => {
		if (event) {
			let currentEl = elements.current.find(
				element => element.className === event.target.className
			);

			currentEl.checked = true;

			dispatch(
				filterSortingActions.filterChanger({
					filter: currentEl.value,
					sort: sort,
				})
			);
		}
	}, [event, elements, sort, dispatch]);

	return { setProp: eventHandler };
};

export default useSetFilter;
