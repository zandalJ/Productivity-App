import styles from "./HeadingText.module.scss";
import { useState, useEffect } from "react";
import moment from "moment";
const HeadingText = () => {
	const [date, setDate] = useState({
		day: moment().date(),
		weekDay: moment().day(),
		month: moment().month(),
	});
	const [welcomeText, setWelcomeText] = useState("Hi");
	useEffect(() => {
		let lastTimeout = 0;
		let setReload = function () {
			const timeUntilMidnight = moment().diff(
				moment().endOf("day").add(1, "ms"),
				"ms"
			);
			return setTimeout(function () {
				setDate({
					day: moment().date(),
					weekDay: moment().day(),
					month: moment().month(),
				});
				lastTimeout = setReload();
			}, timeUntilMidnight);
		};

		lastTimeout = setReload();
		return () => {
			clearInterval(lastTimeout);
		};
	}, [date]);

	function getMonthName(monthNum) {
		const date = new Date();
		date.setMonth(monthNum);
		const formatter = new Intl.DateTimeFormat("en-us", { month: "long" });

		return formatter.format(date);
	}

	function getWeekName(dayNum) {
		const days = [
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday",
		];

		return days[dayNum];
	}

	useEffect(() => {
		let lastTimeout = 0;
		let setReload = function () {
			const timeUntilNewHour = moment().diff(
				moment().endOf("hour").add(1, "ms"),
				"ms"
			);
			return setTimeout(function () {
				if (moment().hour() >= 6 && moment().hour() < 12) {
					setWelcomeText("Good Morning");
				}
				if (moment().hour() >= 12 && moment().hour() < 13) {
					setWelcomeText("Good Noon");
				}
				if (moment().hour() >= 13 && moment().hour() < 20) {
					setWelcomeText("Good Afternoon");
				}
				if (moment().hour() >= 20 && moment().hour() < 23) {
					setWelcomeText("Good Evening");
				}
				if (moment().hour() >= 23 && moment().hour() < 6) {
					setWelcomeText("Good Night");
				}
				lastTimeout = setReload();
			}, timeUntilNewHour);
		};

		lastTimeout = setReload();
		return () => {
			clearInterval(lastTimeout);
		};
	}, [date]);

	return (
		<div className={styles.box}>
			<p>
				{getWeekName(date.weekDay)}, {getMonthName(date.month)} {date.day}
			</p>
			<h1>{welcomeText}, Fabian</h1>
		</div>
	);
};

export default HeadingText;
