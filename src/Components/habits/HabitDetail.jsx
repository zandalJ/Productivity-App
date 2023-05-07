import { Fragment } from "react";
import styles from "./HabitDetail.module.scss";
import Habit from "./Habit";
import HabitForm from "../forms/HabitForm";
import Card from "../ui/Card";
import HabitDetailChart from "./HabitDetailChart";
import useWidth from "../../hooks/useWidth";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const HabitDetail = () => {
	const width = useWidth();
	const { id } = useParams();
	const habitId = parseInt(id.match(/\d+/)[0]);
	const habits = useSelector(state => state.habits.habits);
	const habit = habits[habitId];

	return (
		<Fragment>
			{habits.length > 0 && (
				<div className={styles.box}>
					<div className={styles["habit-box"]}>
						<Habit data={habit} className={styles.habit} detail />
						<Card className={styles["edit-habit-box"]}>
							<h2>Edit your habit</h2>
							<HabitForm habitData={habit} />
						</Card>
					</div>
					<div className={styles["chart-box"]}>
						{width >= 768 && <HabitDetailChart />}
					</div>
				</div>
			)}
		</Fragment>
	);
};

export default HabitDetail;
