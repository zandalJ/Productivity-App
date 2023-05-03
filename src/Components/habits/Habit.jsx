import styles from "./Habit.module.scss";
import Card from "../ui/Card";
import ProgressCircle from "./ProgressCircle";

const habitProps = {
	title: "Water",
	unit: "glasses",
	maxValue: 10,
	currentValue: 5,
};

const Habit = () => {
	return (
		<Card className={styles["habit-card"]}>
			<h2 className={styles['habit-card__title']}>{habitProps.title}</h2>
			<ProgressCircle
				unit={habitProps.unit}
				maxValue={habitProps.maxValue}
				currentValue={habitProps.currentValue}
			/>
		</Card>
	);
};

export default Habit;
