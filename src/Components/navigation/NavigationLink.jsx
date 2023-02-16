import { NavLink } from "react-router-dom";
const NavigationLink = ({ href, title, icon, children }) => {
	return <NavLink to={href}>{children ? children : title || icon}</NavLink>;
};

export default NavigationLink;
