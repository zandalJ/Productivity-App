import styles from "./MainLayout.module.scss";
import { Outlet } from "react-router-dom";
import HeaderNav from "../Components/navigation/HeaderNav";
import SideNav from "../Components/navigation/SideNav";
const MainLayout = () => {
	return (
		<div className={styles['main-wrapper']}>
			<HeaderNav></HeaderNav>
			<div className={styles['sec-wrapper']}>
				<SideNav />
				<main className={styles.main}>
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default MainLayout;
