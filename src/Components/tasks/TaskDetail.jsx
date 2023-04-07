import { useEffect, useState, Fragment } from "react";
import styles from "./TaskDetail.module.scss";
import { useParams } from "react-router-dom";
import EditTaskForm from "../forms/EditTaskForm";
import TaskInfo from "./TaskInfo";
import TaskDetailsInfo from "./TaskDetailsInfo";
import { useSelector } from "react-redux";

const TaskDetail = () => {
	const [isReady, setIsReady] = useState(false);
	const { id } = useParams();
	const tasks = useSelector(state => state.tasks.tasks);
	const task = tasks.find(task => task.id === id);

	useEffect(() => {
		if (tasks.length > 0) {
			setIsReady(true);
		}
	}, [tasks]);

	return (
		<Fragment>
			{isReady ? (
				<div className={styles.details}>
					<div
						className={`${styles["details__wrapper"]} ${styles["details__wrapper--manage"]}`}>
						<h2 className={styles["details__heading"]}>Manage your task</h2>
						<div className={styles["details__content-box"]}>
							<TaskInfo data={task} />
						</div>
					</div>
					<div
						className={`${styles["details__wrapper"]} ${styles["details__wrapper--details"]}`}>
						<h2 className={styles["details__heading"]}>Details</h2>
						<div className={styles["details__content-box"]}>
							<TaskDetailsInfo />
						</div>
					</div>
				</div>
			) : (
				<p>Loading...</p>
			)}
		</Fragment>
	);
};

export default TaskDetail;
