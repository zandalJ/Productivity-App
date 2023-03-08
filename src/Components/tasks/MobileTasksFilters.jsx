import styles from "./MobileTasksFilters.module.scss";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import FilterButtons from "../ui/FilterButtons";
import SortDropdown from "../ui/SortDropdown";

const mobileFiltersVariants = {
	open: {
		translateX: 0,
		transition: { duration: 0.75 },
	},
	closed: {
		translateX: "-200%",
		transition: { duration: 0.75 },
	},
};

const MobileTasksFilters = ({ isClicked, clickHandler, width }) => {
	return (
		<motion.div
			className={styles.wrapper}
			animate={isClicked ? "open" : "closed"}
			initial={"closed"}
			variants={mobileFiltersVariants}>
			<FontAwesomeIcon
				icon={solid("xmark")}
				className={styles["close-btn"]}
				onClick={clickHandler}
			/>
			{width < 768 && <FilterButtons mobile />}
			<SortDropdown mobile />
		</motion.div>
	);
};

export default MobileTasksFilters;
