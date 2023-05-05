import styles from "./HabitDetail.module.scss";
import Habit from "./Habit";
import HabitsForm from "../forms/HabitsForm";
import Card from "../ui/Card";

const habitData = {
	title: "Water",
	unit: "glasses",
	maxValue: 10,
	currentValue: 5,
	id: "habit-1",
};

const HabitDetail = () => {
	return (
		<div className={styles.box}>
			<Habit data={habitData} className={styles.habit} detail />
			<Card className={styles["edit-habit-box"]}>
				<h2>Edit your habit</h2>
				<HabitsForm />
			</Card>
		</div>
	);
};

export default HabitDetail;
