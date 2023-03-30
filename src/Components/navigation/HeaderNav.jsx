import styles from "./HeaderNav.module.scss";
import Logo from "../ui/Logo";
import NavigationLink from "./NavigationLink";
import UserDropdown from "../user/UserDropdown";
import { useSelector } from "react-redux";
const HeaderNav = () => {
	const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
	return (
		<nav className={styles.nav}>
			<NavigationLink href='/'>
				<Logo />
			</NavigationLink>
			{isLoggedIn && <UserDropdown />}
		</nav>
	);
};

export default HeaderNav;
