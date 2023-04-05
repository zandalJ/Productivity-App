import { useSelector, useDispatch } from "react-redux";
import { filterSortingActions } from "../../store/filter-sorting";
import styles from "./SortingSelect.module.scss";
const SortingSelect = () => {
	const filters = useSelector(state => state.filterSorting);
	const dispatch = useDispatch();
	const selectOptionHandler = e => {
		dispatch(
			filterSortingActions.filterChanger({
				filter: filters.filter,
				sort: e.target.value,
			})
		);
	};

	return (
		<select
			name='sort'
			id='sort'
			className={styles.select}
			onChange={selectOptionHandler}
			value={filters.sort}>
			<option value='ca'>Completed Ascending</option>
			<option value='cd'>Completed Descending</option>
		</select>
	);
};

export default SortingSelect;
