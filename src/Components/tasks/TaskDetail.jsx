import { useEffect, useState, Fragment } from "react";
import styles from "./TaskDetail.module.scss";
import { useParams, Link, useNavigate } from "react-router-dom";
import TaskInfo from "./TaskInfo";
import TaskDetailsInfo from "./TaskDetailsInfo";
import { useSelector } from "react-redux";
import Loading from "../ui/Loading";
import AddTaskForm from "../forms/TaskForm";
import Button from "../ui/Button";
import BorderButton from "../ui/BorderButton";

const TaskDetail = () => {
	const [isReady, setIsReady] = useState(false);
	const [editMode, setEditMode] = useState(false);
	const { id } = useParams();
	const navigate = useNavigate();
	const tasks = useSelector(state => state.tasks.tasks);
	const task = tasks.find(task => task.id === id);

	useEffect(() => {
		if (tasks.length > 0) {
			setIsReady(true);
		}
	}, [tasks]);

	const editModeHandler = () => setEditMode(state => !state);

	const taskSubmitHandler = () => {
		navigate("/tasks");
	};

	return (
		<Fragment>
			{isReady ? (
				<div className={styles.details}>
					<div
						className={`${styles["details__wrapper"]} ${styles["details__wrapper--manage"]}`}>
						<h2 className={styles["details__heading"]}>Manage your task</h2>
						<div className={styles["details__content-box"]}>
							{!editMode ? (
								<TaskInfo data={task} changeEdit={editModeHandler} />
							) : (
								<AddTaskForm submitChange={taskSubmitHandler}>
									<div className={styles["btn-box"]}>
										<Link to='/tasks'>
											<BorderButton>Cancel</BorderButton>
										</Link>
										<Button submit>Save</Button>
									</div>
								</AddTaskForm>
							)}
						</div>
					</div>
					<div
						className={`${styles["details__wrapper"]} ${styles["details__wrapper--details"]}`}>
						<h2 className={styles["details__heading"]}>Details</h2>
						<div className={styles["details__content-box"]}>
							<TaskDetailsInfo data={task}/>
						</div>
					</div>
				</div>
			) : (
				<Loading />
			)}
		</Fragment>
	);
};

export default TaskDetail;
