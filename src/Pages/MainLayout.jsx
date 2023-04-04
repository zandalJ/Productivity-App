import { Fragment, useState, useEffect } from "react";
import styles from "./MainLayout.module.scss";
import { Outlet, useLocation } from "react-router-dom";
import HeaderNav from "../Components/navigation/HeaderNav";
import SideNav from "../Components/navigation/SideNav";
import Modal from "../Components/ui/modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAuth } from "../store/auth-actions";
import { fetchTasks } from "../store/tasks-actions";

const MainLayout = () => {
	const dispatch = useDispatch();
	const loginState = useSelector(state => state.auth.isLoggedIn);
	const tasks = useSelector(state => state.tasks.tasks)

	useEffect(() => {
		console.log(tasks);
	}, [tasks])

	useEffect(() => {
		dispatch(fetchUserAuth());
	}, [dispatch]);

	useEffect(() => {
		if (loginState) dispatch(fetchTasks());
	}, [dispatch, loginState]);

	let location = useLocation().pathname;
	const renderModal = location === "/tasks" || location === "/habits";

	const [showModal, setShowModal] = useState(false);
	const showModalHandler = () => setShowModal(before => !before);

	return (
		<Fragment>
			{renderModal && (
				<Modal
					modal={showModal}
					showModal={showModalHandler}
					location={location}
				/>
			)}
			<div className={styles["main-wrapper"]}>
				<HeaderNav></HeaderNav>
				<div className={styles["sec-wrapper"]}>
					<SideNav showModal={showModalHandler} location={location} />
					<main className={styles.main}>
						<Outlet />
					</main>
				</div>
			</div>
		</Fragment>
	);
};

export default MainLayout;
