import { useState, useEffect, Fragment } from "react";
import styles from "./SideNav.module.scss";
import useWidth from "../../hooks/useWidth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import UserNavInfo from "../ui/UserNavInfo";
import { NavLink } from "react-router-dom";
import SideNavLinkText from "./SideNavLinkText";
import { motion } from "framer-motion";
import NavArrow from "./NavArrow";

const navVariants = {
	open: width => ({
		width: width >= 576 ? "300px" : "240px",
		transition: { duration: 0.3 },
	}),
	closed: width => ({
		width: width >= 576 ? "85px" : "75px",
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

const SideNav = () => {
	const [open, setIsOpen] = useState(true);
	const width = useWidth();
	useEffect(() => {
		if (width >= 992) {
			setIsOpen(true);
		} else {
			setIsOpen(false);
		}
	}, [width]);

	const navOpenHandler = () => setIsOpen(before => !before);
	const photoSize = width >= 576 ? 80 : 50;

	return (
		<Fragment>
			{width < 992 && (
				<NavArrow open={open} openHandler={navOpenHandler} width={width} />
			)}
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
					<li>
						<NavLink
							to='/test'
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
					</li>
					<li>
						<NavLink
							to='/test'
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
					</li>
					<li>
						<NavLink
							to='/test'
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
					</li>
					<li>
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
					</li>
				</ul>
			</motion.nav>
		</Fragment>
	);
};

export default SideNav;
