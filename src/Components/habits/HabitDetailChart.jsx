import { useState, useEffect } from "react";
import styles from "./HabitsDetailChart.module.scss";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

const options = {
	responsive: true,
	maintainAspectRatio: false,
	plugins: {
		legend: {
			display: false,
		},
		title: {
			display: false,
		},
	},
};

const HabitDetailChart = () => {
	const [chartData, setChartData] = useState({});

	const { id } = useParams();
	const habits = useSelector(state => state.habits.habits);
	const habitId = parseInt(id.match(/\d+/)[0]);

	useEffect(() => {
		if (habits.length > 0) {
			const dayWeekAgo = moment().subtract(habits[0].days.length, "days");
			const daysArray = Array.from({ length: habits[0].days.length }, (_, i) =>
				moment().subtract(i, "days")
			).filter(day => day.isAfter(dayWeekAgo));

			const labels = daysArray?.map(day => day.format("dddd"));
			const habit = habits[habitId];
			const habitColor = habit.color;

			const chartObj = {
				labels,
				datasets: [
					{
						data: labels.map((_, index) => parseInt(habit.days[index].ratio)),
						borderColor: habitColor,
						backgroundColor: habitColor,
					},
				],
			};

			console.log(chartObj);

			setChartData(chartObj);
		}
	}, [habits]);

	return (
		<div className={styles["content-box"]}>
			<div className={styles["text-box"]}>
				<div className={styles["text-box__line"]}></div>
				<p>Daily History In Percentage</p>
			</div>
			{Object.keys(chartData).length > 0 && (
				<div className={styles["chart-box"]}>
					<Bar
						options={options}
						data={chartData}
						aria-label='Habit Detail Chart'
					/>
				</div>
			)}
		</div>
	);
};

export default HabitDetailChart;
