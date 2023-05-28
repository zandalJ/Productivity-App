import styles from "./DropdownList.module.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../store/auth-actions";

const variants = {
	open: {
		top: ["-25vh", "20vh", "11vh"],
		transition: {
			duration: 0.8,
		},
	},
	closed: {
		top: ["11vh", "20vh", "-25vh"],
		transition: {
			duration: 0.5,
		},
	},
};

const DropdownList = ({ isClicked }) => {
	const dispatch = useDispatch();
	const loginState = useSelector(state => state.auth.isLoggedIn);

	const logoutUserHandler = () => {
		if (loginState) {
			dispatch(logoutUser());
		}
	};

	return (
		<motion.div
			className={styles["items-box"]}
			animate={isClicked ? "open" : "closed"}
			initial={false}
			variants={variants}>
			<ul>
				<li>
					<Link to='/profile'>
						<FontAwesomeIcon icon={solid("user")} className={styles.icon} />
						<span>Profile</span>
					</Link>
				</li>
				<li>
					<Link to='/settings'>
						<FontAwesomeIcon icon={solid("gear")} className={styles.icon} />
						<span>Settings</span>
					</Link>
				</li>
				<li>
					<Link to='/login' onClick={logoutUserHandler}>
						<FontAwesomeIcon
							icon={solid("arrow-right-from-bracket")}
							className={styles.icon}
						/>
						<span>Logout</span>
					</Link>
				</li>
			</ul>
		</motion.div>
	);
};

export default DropdownList;
