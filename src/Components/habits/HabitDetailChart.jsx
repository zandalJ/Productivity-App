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

const data = [100, 95, 40, 0, 63, 21, 100];

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

const labels = [
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
	"Sunday",
];

const chartData = {
	labels,
	datasets: [
		{
			data: labels.map((label, index) => data[index]),
			backgroundColor: "rgba(33, 146, 255,.5)",
		},
	],
};

const HabitDetailChart = () => {
	return (
		<div className={styles["content-box"]}>
			<div className={styles["text-box"]}>
				<div className={styles["text-box__line"]}></div>
				<p>Daily History</p>
			</div>
			<div className={styles["chart-box"]}>
				<Bar options={options} data={chartData} />
			</div>
		</div>
	);
};

export default HabitDetailChart;
