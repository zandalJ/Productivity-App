import { useEffect, Fragment, useCallback, useState } from "react";
import styles from "./Habits.module.scss";
import Habit from "./Habit";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { addHabitsToNewDay } from "../../store/habits-actions";
import NoDataInfo from "../ui/NoDataInfo";

const Habits = () => {
	const dispatch = useDispatch();
	const habits = useSelector(state => state.habits.habits);

	const [isNewDay, setIsNewDay] = useState(false);

	const newDayHandler = useCallback(() => {
		const endOfDay = moment().endOf("day");
		const timeToEndDay = endOfDay.diff(moment());

		setTimeout(() => {
			setIsNewDay(true);
			setTimeout(() => {
				setIsNewDay(false);
			}, 1000);
			dispatch(addHabitsToNewDay(habits));
		}, timeToEndDay);
	}, [dispatch, habits]);

	useEffect(() => {
		newDayHandler();
	}, [newDayHandler, isNewDay]);

	return (
		<div className={styles.box}>
			{habits.length > 0 ? (
				<Fragment>
					{habits.map((habit, index) => {
						return <Habit data={habit} key={index} />;
					})}{" "}
				</Fragment>
			) : (
				<NoDataInfo message='You have no habits created.' />
			)}
		</div>
	);
};

export default Habits;
