import styles from "./NavigationLink.module.scss";
import { NavLink } from "react-router-dom";
const NavigationLink = ({ href, title, icon, children }) => {
	const activeStyles = children ? undefined : styles["active-link"];
	const defaultStyles = children ? undefined : styles["default-link"];
	return (
		<NavLink
			to={href}
			className={({ isActive }) => (isActive ? activeStyles : defaultStyles)}>
			{children ? children : title || icon}
		</NavLink>
	);
};

export default NavigationLink;
