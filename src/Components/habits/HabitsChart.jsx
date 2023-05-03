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

const data = {
	water: [100, 95, 0, 17, 56, 23, 86],
	running: [32, 53, 100, 2, 36, 94, 28],
	reading: [0, 100, 100, 95, 25, 5, 78],
};

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
		},
		title: {
			display: true,
			text: "Chart.js Line Chart",
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
			label: "drinking water",
			data: labels.map((label, index) => data.water[index]),
			borderColor: "rgb(19, 181, 122)",
			backgroundColor: "rgba(19, 181, 122,.5)",
		},
		{
			label: "running",
			data: labels.map((label, index) => data.running[index]),
			borderColor: "rgb(166, 84, 237)",
			backgroundColor: "rgba(166, 84, 237,.5)",
		},
		{
			label: "reading book",
			data: labels.map((label, index) => data.reading[index]),
			borderColor: "rgb(33, 146, 255)",
			backgroundColor: "rgba(33, 146, 255,.5)",
		},
	],
};

const HabitsChart = () => {
	return (
		<div className={styles.box}>
			<Line options={options} data={chartData} className={styles.chart}></Line>
		</div>
	);
};

export default HabitsChart;
