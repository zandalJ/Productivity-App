import styles from "./NavArrow.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const btnVariants = {
	opened: width=>({ left: width<576 ? "265px" : "325px", transition: { duration: 0.2 } }),
	closed: width=>({ left: width<576 ? "100px" : '110px', transition: { duration: 0.4, delay: 0.3 } }),
};

const arrowStyle = ({open}) => ({
	transform:`rotate(${open ? 180 : 0}deg)`
})


const NavArrow = ({ open, openHandler, width }) => {
	const color = useSelector(state => state.mainColor.color)
	return (
		<motion.button
			className={`${styles["arrow-btn"]} ${
				color ? styles["arrow-btn--white"] : styles["arrow-btn--black"]
			}`}
			onClick={openHandler}
			animate={open ? "opened" : "closed"}
			initial={"closed"}
			custom={width}
			variants={btnVariants}>
			<FontAwesomeIcon
				icon={solid("arrow-right")}
				className={`${styles.icon} ${
					color ? styles["icon--white"] : styles["icon--black"]
				}`}
				style={arrowStyle({ open })}
			/>
		</motion.button>
	);
};

export default NavArrow;
