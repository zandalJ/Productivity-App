import { Fragment, useState, useEffect, useReducer } from "react";
import styles from "./MainLayout.module.scss";
import { Outlet, useLocation } from "react-router-dom";
import HeaderNav from "../Components/navigation/HeaderNav";
import SideNav from "../Components/navigation/SideNav";
import Modal from "../Components/ui/modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAuth } from "../store/auth-actions";
import { fetchTasks } from "../store/tasks-actions";
import { fetchHabits } from "../store/habits-actions";
import CreateFormModalContent from "../Components/ui/modal/CreateFormModalContent";
import LoadingSpinner from "../Components/ui/LoadingSpinner";

const reducer = (state, action) => {
	switch (action.type) {
		case "tasks_habits_loading": {
			return {
				tasksHabitsLoading: action.loading,
				userAuthLoading: state.userAuthLoading,
			};
		}
		case "user_auth_loading": {
			return {
				tasksHabitsLoading: state.tasksHabitsLoading,
				userAuthLoading: action.loading,
			};
		}
	}
};

const MainLayout = () => {
	const reduxDispatch = useDispatch();
	const loginState = useSelector(state => state.auth.isLoggedIn);

	const [state, reducerDispatch] = useReducer(reducer, {
		tasksHabitsLoading: true,
		userAuthLoading: true,
	});

	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		const getTasksHabitsData = async () => {
			reducerDispatch({ type: "tasks_habits_loading", loading: true });
			await reduxDispatch(fetchTasks());
			await reduxDispatch(fetchHabits());
			reducerDispatch({ type: "tasks_habits_loading", loading: false });
		};

		const getUserAuth = async () => {
			reducerDispatch({ type: "user_auth_loading", loading: true });
			await reduxDispatch(fetchUserAuth());
			reducerDispatch({ type: "user_auth_loading", loading: false });
		};

		if (loginState) getTasksHabitsData();
		getUserAuth();
	}, [reduxDispatch, loginState]);

	let location = useLocation().pathname;
	const renderModal =
		location === "/tasks" ||
		location === "/habits" ||
		location === "/team-members";

	const showModalHandler = () => setShowModal(before => !before);

	if (state.tasksHabitsLoading || state.userAuthLoading)
		return <LoadingSpinner main />;

	return (
		<Fragment>
			{renderModal && (
				<Modal modal={showModal} showModal={showModalHandler}>
					<CreateFormModalContent
						modal={showModal}
						showModal={showModalHandler}
					/>
				</Modal>
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
