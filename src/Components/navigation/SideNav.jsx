import { useState, useEffect, Fragment } from "react";
import styles from "./SideNav.module.scss";
import useWidth from "../../hooks/useWidth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import UserNavInfo from "../user/UserNavInfo";
import { NavLink } from "react-router-dom";
import SideNavLinkText from "./SideNavLinkText";
import { motion } from "framer-motion";
import NavArrow from "./NavArrow";
import Button from "../ui/Button";
import { logoutUser } from "../../store/auth-actions";
import { useDispatch, useSelector } from "react-redux";

const navVariants = {
	open: width => ({
		minWidth: width >= 576 ? "300px" : "240px",
		maxWidth: width >= 576 ? "300px" : "240px",
		transition: { duration: 0.3 },
	}),
	closed: width => ({
		maxWidth: width >= 576 ? "85px" : "75px",
		minWidth: width >= 576 ? "85px" : "75px",
		transition: { duration: 0.3, delay: 0.1 },
	}),
};

const itemsVariants = {
	open: {
		scale: 1,
		transition: { duration: 0.3, delay: 0.4 },
	},
	closed: {
		scale: 0,
	},
};

const buttonVariants = {
	open: {
		opacity: 1,
		translateX: "-50%",
		transition: { transform: 0.3 },
	},
	closed: {
		opacity: 0,
		translateX: "-50%",
	},
	hover: {
		scale: 0.95,
		translateX: "-50%",
	},
};

const liVariants = {
	display: open => ({
		display: !open ? "flex" : "block",
		justifyContent: !open ? "center" : null,
	}),
};

const SideNav = ({ showModal, location }) => {
	const [open, setIsOpen] = useState(true);
	const width = useWidth();
	const dispatch = useDispatch();
	const showButton = location === "/tasks";
	const loginState = useSelector(state => state.auth.isLoggedIn);

	useEffect(() => {
		if (width >= 992) {
			setIsOpen(true);
		} else {
			setIsOpen(false);
		}
	}, [width]);

	const navOpenHandler = () => setIsOpen(before => !before);
	const photoSize = width >= 576 ? 80 : 50;

	const MotionButton = motion(Button);

	const showModalHandler = () => {
		showModal();
	};

	const logoutUserHandler = () => {
		if (loginState) {
			dispatch(logoutUser());
		}
	};

	return (
		<Fragment>
			{width < 992 && (
				<NavArrow open={open} openHandler={navOpenHandler} width={width} />
			)}
			<div className={styles.wrapper}>
				<motion.nav
					className={`${styles.nav} ${
						open ? styles["opened-nav"] : styles["closed-nav"]
					}`}
					onDoubleClick={navOpenHandler}
					animate={open ? "open" : "closed"}
					initial={open ? "open" : "closed"}
					custom={width}
					variants={navVariants}>
					<UserNavInfo
						open={open}
						animationVariants={itemsVariants}
						photoSize={photoSize}
					/>
					{loginState && (
						<Fragment>
							<motion.p
								className={styles["menu-text"]}
								animate={open ? "open" : "closed"}
								initial={open ? "open" : "closed"}
								variants={itemsVariants}>
								Menu
							</motion.p>
							<ul
								className={`${styles["links-list"]} ${
									open ? styles["list-opened"] : styles["list-closed"]
								}`}>
								<motion.li
									animate={"display"}
									initial={"display"}
									custom={open}
									variants={liVariants}>
									<NavLink
										to='/dashboard'
										className={({ isActive }) =>
											[styles.link, isActive ? styles["active-link"] : null]
												.filter(Boolean)
												.join(" ")
										}>
										<FontAwesomeIcon
											icon={solid("table-columns")}
											className={styles.icon}
										/>
										<SideNavLinkText open={open} variants={itemsVariants}>
											Dashboard
										</SideNavLinkText>
									</NavLink>
								</motion.li>
								<motion.li
									animate={"display"}
									initial={"display"}
									custom={open}
									variants={liVariants}>
									<NavLink
										to='/tasks'
										className={({ isActive }) =>
											[styles.link, isActive ? styles["active-link"] : null]
												.filter(Boolean)
												.join(" ")
										}>
										<FontAwesomeIcon
											icon={solid("table-list")}
											className={styles.icon}
										/>
										<SideNavLinkText open={open} variants={itemsVariants}>
											Tasks
										</SideNavLinkText>
									</NavLink>
								</motion.li>
								<motion.li
									animate={"display"}
									initial={"display"}
									custom={open}
									variants={liVariants}>
									<NavLink
										to='/habits'
										className={({ isActive }) =>
											[styles.link, isActive ? styles["active-link"] : null]
												.filter(Boolean)
												.join(" ")
										}>
										<FontAwesomeIcon
											icon={solid("arrows-rotate")}
											className={styles.icon}
										/>
										<SideNavLinkText open={open} variants={itemsVariants}>
											Habits
										</SideNavLinkText>
									</NavLink>
								</motion.li>
								<motion.li
									animate={"display"}
									initial={"display"}
									custom={open}
									variants={liVariants}>
									<NavLink
										to='/test'
										className={({ isActive }) =>
											[styles.link, isActive ? styles["active-link"] : null]
												.filter(Boolean)
												.join(" ")
										}>
										<FontAwesomeIcon
											icon={solid("user-group")}
											className={styles.icon}
										/>
										<SideNavLinkText open={open} variants={itemsVariants}>
											Team Members
										</SideNavLinkText>
									</NavLink>
								</motion.li>
								<motion.li
									animate={"display"}
									initial={"display"}
									custom={open}
									variants={liVariants}>
									<NavLink
										to='/login'
										className={styles.link}
										onClick={logoutUserHandler}>
										<FontAwesomeIcon
											icon={solid("right-from-bracket")}
											className={styles.icon}
										/>
										<SideNavLinkText open={open} variants={itemsVariants}>
											Log out
										</SideNavLinkText>
									</NavLink>
								</motion.li>
							</ul>
						</Fragment>
					)}
				</motion.nav>
				{showButton && (
					<MotionButton
						className={styles["show-btn"]}
						onClick={showModalHandler}
						variants={buttonVariants}
						animate={open ? "open" : "closed"}
						initial={open ? "open" : "closed"}
						whileHover='hover'>
						Add New Task <FontAwesomeIcon icon={solid("plus")} />
					</MotionButton>
				)}
			</div>
		</Fragment>
	);
};

export default SideNav;
