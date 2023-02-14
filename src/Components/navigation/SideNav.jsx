import { useState, useEffect } from "react";
import styles from "./SideNav.module.scss";
import useWidth from "../../hooks/useWidth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import UserNavInfo from "../ui/UserNavInfo";
import { NavLink } from "react-router-dom";
const SideNav = () => {
	const [open, setIsOpen] = useState(false);
	const width = useWidth();
	useEffect(() => {
		if (width >= 992) {
			setIsOpen(true);
		} else {
			setIsOpen(false);
		}
	}, [width]);

	return (
		<nav
			className={`${styles.nav} ${
				open ? styles["opened-nav"] : styles["closed-nav"]
			}`}>
			{open && (
				<>
					<UserNavInfo />
					<p className={styles["menu-text"]}>Menu</p>
				</>
			)}
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
						{open && <span>Dashboard</span>}
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
						{open && <span>Tasks</span>}
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
						{open && <span>Habits</span>}
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
						{open && <span>Team Members</span>}
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default SideNav;
