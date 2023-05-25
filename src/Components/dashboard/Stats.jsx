import { useEffect, useState } from "react";
import styles from "./Stats.module.scss";
import Card from "../ui/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { getTasksHabitsInfo } from "../../store/tasks-actions";

const Stats = ({ title, icon, color }) => {
	const dispatch = useDispatch();

	const [tasksData, setTasksData] = useState({});
	const [statsCount, setStatsCount] = useState(0);

	useEffect(() => {
		const getTasksData = async () => {
			setTasksData(await dispatch(getTasksHabitsInfo()));
		};

		getTasksData();
	}, [dispatch]);

	useEffect(() => {
		if (Object.keys(tasksData).length > 0) {
			if (title === "All Tasks") {
				setStatsCount(tasksData.allTasks.length);
			} else if (title === "Completed Tasks") {
				setStatsCount(tasksData.allCompletedTasks.length);
			} else if (title === "New Tasks") {
				setStatsCount(tasksData.newTasks.count);
			} else if (title === "Habbits Streak") {
				setStatsCount(0);
			}
		}
	}, [title, tasksData]);

	return (
		<Card className={styles.card}>
			<div className={styles["card__text"]}>
				<FontAwesomeIcon icon={icon} className={styles["card__icon"]} />
				<p>{title}</p>
			</div>
			<p
				className={`${styles["card__number"]} ${
					styles[`card__number--${color}`]
				}`}>
				{statsCount}
			</p>
		</Card>
	);
};

export default Stats;
