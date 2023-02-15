import styles from "./NavArrow.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { motion } from "framer-motion";
const btnVariants = {
	opened: width=>({ left: width<576 ? "265px" : "325px", transition: { duration: 0.2 } }),
	closed: width=>({ left: width<576 ? "100px" : '110px', transition: { duration: 0.4, delay: 0.3 } }),
};
const NavArrow = ({ open, openHandler, width }) => {
	return (
		<motion.button
			className={styles["arrow-btn"]}
			onClick={openHandler}
			animate={open ? "opened" : "closed"}
			initial={"closed"}
            custom={width}
			variants={btnVariants}>
			<FontAwesomeIcon icon={solid("arrow-right")} className={styles.icon} />
		</motion.button>
	);
};

export default NavArrow;
