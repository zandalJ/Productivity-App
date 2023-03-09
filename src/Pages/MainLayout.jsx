import { Fragment, useState } from "react";
import styles from "./MainLayout.module.scss";
import { Outlet } from "react-router-dom";
import HeaderNav from "../Components/navigation/HeaderNav";
import SideNav from "../Components/navigation/SideNav";
const MainLayout = () => {
	const [showModal, setShowModal] = useState(false);
	const showModalHandler = () => setShowModal(before => !before) 
	return (
		<Fragment>
			<div
				className={`${styles.modal} ${
					showModal ? styles["modal--show"] : styles["modal--hidden"]
				}`}></div>
			<div className={styles["main-wrapper"]}>
				<HeaderNav></HeaderNav>
				<div className={styles["sec-wrapper"]}>
					<SideNav showModal={showModalHandler} />
					<main className={styles.main}>
						<Outlet />
					</main>
				</div>
			</div>
		</Fragment>
	);
};

export default MainLayout;
