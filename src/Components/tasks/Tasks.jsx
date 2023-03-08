import styles from "./Tasks.module.scss";
import Task from "./Task";
const Tasks = () => {
	return (
		<div className={styles['tasks-box']}>
			<Task />
			<Task />
			<Task />
			<Task />
			<Task />
			<Task />
			<Task />
			<Task />
			<Task />
			<Task />
			<Task />
		</div>
	);
};

export default Tasks;
