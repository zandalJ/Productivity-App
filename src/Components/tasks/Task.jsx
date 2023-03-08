import styles from "./Task.module.scss";
import Card from "../ui/Card";
import UserPhoto from "../ui/UserPhoto";
import ProgressBar from "../ui/ProgressBar";
const Task = () => {
	return (
		<Card className={styles.card} data-filter-type='progress'>
			<p className={styles["card__title"]} data-filter-type='progress'>
				Web Design
			</p>
			<p className={styles["card__desc"]}>
				Wireframing, mockups, clients, collaboration
			</p>
			<ProgressBar progress='50'/>
			<div className={styles["card__members-box"]}>
				<UserPhoto
					href='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
					size='20'
				/>
			</div>
		</Card>
	);
};

export default Task;
