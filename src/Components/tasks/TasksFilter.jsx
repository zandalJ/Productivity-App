import { Fragment, useState } from "react";
import styles from "./TasksFilter.module.scss";
import FilterButtons from "../ui/FilterButtons";
import SortDropdown from "../ui/SortDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import useWidth from "../../hooks/useWidth";
import { motion } from "framer-motion";

const mobileFiltersVariants = {
	open: {
		translateX: 0,
		transition: { duration: 0.3 },
	},
	closed: {
		translateX: "-100%",
		transition: { duration: 0.3 },
	},
};

const TasksFilter = () => {
	const [isClicked, setIsClicked] = useState(false);
	const width = useWidth();
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
			<motion.div
				className={styles['mobile-filters-wrapper']}
				animate={isClicked ? "open" : "closed"}
				initial={"closed"}
				variants={mobileFiltersVariants}>
				<h1>test</h1>
			</motion.div>
		</Fragment>
	);
};

export default TasksFilter;
