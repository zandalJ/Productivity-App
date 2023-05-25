import { Fragment, useEffect, useState } from "react";
import styles from "./GrowthCard.module.scss";
import Card from "../ui/Card";
import { useDispatch } from "react-redux";
import { getTasksHabitsInfo } from "../../store/tasks-actions";
const GrowthCard = ({ title, color }) => {
	const initialTasksObject = {
		taskCompleted: {
			count: 0,
			percentage: 0,
		},
		newTasks: {
			count: 0,
			percentage: 0,
		},
	};

	const [tasksData, setTasksData] = useState(initialTasksObject);
	const [dataFetched, setDataFetched] = useState(false);
	const dispatch = useDispatch();

	const objectPropertyName =
		title === "Tasks Completed" ? "taskCompleted" : "newTasks";

	useEffect(() => {
		const getTasksData = async () => {
			setTasksData(await dispatch(getTasksHabitsInfo()));
			setDataFetched(true);
		};

		getTasksData();
	}, [dispatch]);

	return (
		<Fragment>
			{dataFetched && (
				<Card className={styles["growth-card"]}>
					<div className={styles["growth-card__header-box"]}>
						<p
							className={`${styles["growth-card__text"]} ${
								styles[`growth-card__text--${color}`]
							}`}>
							{title}
						</p>
						<p className={styles["growth-card__number-count"]}>
							{tasksData[objectPropertyName].count}
						</p>
					</div>
					<p className={styles["growth-card__description"]}>
						<span className={styles["growth-card__description--percentage"]}>
							{`+${tasksData[objectPropertyName].percentage}%`}
						</span>
						more from the last week
					</p>
				</Card>
			)}
		</Fragment>
	);
};

export default GrowthCard;
