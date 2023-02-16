import styles from "./HeaderNav.module.scss";
import Logo from "../ui/Logo";
import NavigationLink from "./NavigationLink";
import UserDropdown from "../user/UserDropdown";
const HeaderNav = () => {
	return (
		<nav className={styles.nav}>
			<NavigationLink href="/">
				<Logo />
			</NavigationLink>
                <UserDropdown/>
		</nav>
	);
};

export default HeaderNav;
