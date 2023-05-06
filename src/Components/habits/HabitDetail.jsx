import styles from "./HabitDetail.module.scss";
import Habit from "./Habit";
import HabitsForm from "../forms/HabitsForm";
import Card from "../ui/Card";
import HabitDetailChart from "./HabitDetailChart";
import useWidth from "../../hooks/useWidth";

const habitData = {
	title: "Water",
	unit: "glasses",
	maxValue: 10,
	currentValue: 5,
	id: "habit-1",
};

const HabitDetail = () => {
	const width = useWidth();
	return (
		<div className={styles.box}>
			<div className={styles["habit-box"]}>
				<Habit data={habitData} className={styles.habit} detail />
				<Card className={styles["edit-habit-box"]}>
					<h2>Edit your habit</h2>
					<HabitsForm />
				</Card>
			</div>
			<div className={styles["chart-box"]}>
				{width >= 768 && <HabitDetailChart />}
			</div>
		</div>
	);
};

export default HabitDetail;
