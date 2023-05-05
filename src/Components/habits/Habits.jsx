import styles from "./Habits.module.scss";
import Habit from "./Habit";

const habitsData = [
	{
		title: "Water",
		unit: "glasses",
		maxValue: 10,
		currentValue: 5,
		id: "habit-1",
	},
	{
		title: "Reading Book",
		unit: "minutes",
		maxValue: 30,
		currentValue: 10,
		id: "habit-2",
	},
	{
		title: "Running",
		unit: "kilometers",
		maxValue: 2.2,
		currentValue: 0.2,
		id: "habit-3",
	},
	{
		title: "Learning",
		unit: "minutes",
		maxValue: 60,
		currentValue: 45,
		id: "habit-4",
	},
	{
		title: "Gym",
		unit: "minutes",
		maxValue: 15,
		currentValue: 0,
		id: "habit-5",
	},
];

const Habits = () => {
	return (
		<div className={styles.box}>
			{habitsData.map((habit, index) => {
				return <Habit data={habit} key={index} />;
			})}
		</div>
	);
};

export default Habits;
