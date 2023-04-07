import styles from "./TaskInfoBox.module.scss";

const TaskInfoBox = ({ title, data }) => {
	return (
		<div className={styles.box}>
			<p className={styles["box__title"]}>{title}</p>
			<p className={styles["box__data"]}>{data}</p>
		</div>
	);
};

export default TaskInfoBox;
