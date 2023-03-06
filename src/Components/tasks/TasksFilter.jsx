import { Fragment, useState, useEffect } from "react";
import styles from "./TasksFilter.module.scss";
import FilterButtons from "../ui/FilterButtons";
import SortDropdown from "../ui/SortDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import useWidth from "../../hooks/useWidth";
import MobileTasksFilters from "./MobileTasksFilters";
import { useDispatch, useSelector } from "react-redux";
import { colorActions } from "../../store/main-color";
import { useSearchParams } from "react-router-dom";
import { sendFilterData, fetchFilterData } from "../../store/filter-actions";

let isInitial = true;

const TasksFilter = () => {
	const filters = useSelector(state => state.filterSorting);
	const dispatch = useDispatch();
	const [previousFilters, setPreviousFilters] = useState(filters);
	const [isClicked, setIsClicked] = useState(false);
	const width = useWidth();

	useEffect(() => {
		dispatch(fetchFilterData());
	}, [dispatch]);

	useEffect(() => {
		// if (isInitial) {
		// 	isInitial = false;
		// 	return;
		// }

		dispatch(fetchFilterData());

		if (previousFilters.filter === filters.filter) {
			return;
		} else {
			dispatch(sendFilterData(filters));
			setPreviousFilters(filters);
		}
	}, [filters, dispatch, previousFilters.filter]);

	useEffect(() => {
		dispatch(colorActions.colorChanger());
	}, [isClicked, dispatch]);

	const isClickedHandler = () => {
		setIsClicked(before => !before);
	};

	return (
		<Fragment>
			<div className={styles["filter-wrapper"]}>
				{width >= 768 && <FilterButtons desktop />}
				{width >= 992 && <SortDropdown desktop />}
				{width < 992 && (
					<FontAwesomeIcon
						icon={solid("bars-staggered")}
						className={styles.icon}
						onClick={isClickedHandler}
					/>
				)}
			</div>
			<MobileTasksFilters
				isClicked={isClicked}
				clickHandler={isClickedHandler}
				width={width}
			/>
		</Fragment>
	);
};

export default TasksFilter;
