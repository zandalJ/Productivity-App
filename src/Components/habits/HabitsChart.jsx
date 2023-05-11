import { Fragment, useState, useEffect } from "react";
import styles from "./HabitsChart.module.scss";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import moment from "moment";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

const options = {
	responsive: true,
	maintainAspectRatio: false,
	plugins: {
		legend: {
			position: "top",
			labels: {
				font: {
					size: 16,
					family: "'nunito', 'sans-serif'",
				},
				color: "#e3e9ee",
			},
		},
		title: {
			display: true,
			text: "Completion percentage of all habits",
			font: {
				size: 20,
				family: "'nunito', 'sans-serif'",
			},
			color: "#e3e9ee",
		},
	},
	scales: {
		y: {
			suggestedMin: 0,
			suggestedMax: 100,
		},
	},
};

const HabitsChart = () => {
	const [chartData, setChartData] = useState({});

	const habits = useSelector(state => state.habits.habits);

	useEffect(() => {
		if (habits.length > 0) {
			const dayWeekAgo = moment().subtract(habits[0].days.length, "days");
			const daysArray = Array.from({ length: habits[0].days.length }, (_, i) =>
				moment().subtract(i, "days")
			).filter(day => day.isAfter(dayWeekAgo));

			const labels = daysArray?.map(day => day.format("dddd"));
			const chartObj = {
				labels,
				datasets: habits.map(habit => {
					return {
						label: habit.name,
						data: labels?.map((_, index) => parseInt(habit.days[index].ratio)),
						borderColor: habit.color,
						backgroundColor: habit.color,
					};
				}),
			};
			setChartData(chartObj);
		}
	}, [habits]);

	return (
		<Fragment>
			{Object.keys(chartData).length > 0 && (
				<div className={styles["chart-box"]}>
					<Line
						options={options}
						data={chartData}
						className={styles.chart}
						aria-label='Complementation percentage chart'
					/>
				</div>
			)}
		</Fragment>
	);
};

export default HabitsChart;
