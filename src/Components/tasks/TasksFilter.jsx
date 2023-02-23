import { Fragment, useState, useEffect } from "react";
import styles from "./TasksFilter.module.scss";
import FilterButtons from "../ui/FilterButtons";
import SortDropdown from "../ui/SortDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import useWidth from "../../hooks/useWidth";
import MobileTasksFilters from "./MobileTasksFilters";
import { useDispatch } from "react-redux";
import { colorActions } from "../../store/main-color";
const TasksFilter = () => {
	const dispatch = useDispatch();
	const width = useWidth();
	const [isClicked, setIsClicked] = useState(false);
	useEffect(() => {
		dispatch(colorActions.colorChanger())
	}, [isClicked]);
	const isClickedHandler = () => {
		setIsClicked(before => !before);
	};
	return (
		<Fragment>
			<div className={styles["filter-wrapper"]}>
				{width >= 768 && <FilterButtons />}
				{width >= 992 && <SortDropdown />}
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
