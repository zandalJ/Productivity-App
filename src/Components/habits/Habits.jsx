import { useEffect } from "react";
import styles from "./Habits.module.scss";
import Habit from "./Habit";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { addHabitsToNewDay } from "../../store/habits-actions";

const Habits = () => {
	const dispatch = useDispatch();
	const habits = useSelector(state => state.habits.habits);

	const msTillEndOfDay = moment()
		.endOf("day")
		.add(1, "seconds")
		.diff(moment(), "milliseconds");

	useEffect(() => {
		setTimeout(() => {
			dispatch(addHabitsToNewDay(habits));
		}, [msTillEndOfDay]);
	}, [msTillEndOfDay, dispatch, habits]);

	return (
		<div className={styles.box}>
			{habits.map((habit, index) => {
				return <Habit data={habit} key={index} />;
			})}
		</div>
	);
};

export default Habits;
