import styles from "./Habits.module.scss";
import Habit from "./Habit";

const Habits = () => {
	return (
		<div className={styles.box}>
			<Habit />
			<Habit />
			<Habit />
			<Habit />
			<Habit />
		</div>
	);
};

export default Habits;
