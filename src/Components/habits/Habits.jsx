import styles from "./Habits.module.scss";
import Habit from "./Habit";
import { useSelector } from "react-redux";

const Habits = () => {
	const habits = useSelector(state => state.habits.habits);
	return (
		<div className={styles.box}>
			{habits.map((habit, index) => {
				return <Habit data={habit} key={index} />;
			})}
		</div>
	);
};

export default Habits;
