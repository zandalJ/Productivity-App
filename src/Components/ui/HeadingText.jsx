import { useState, useEffect, Fragment, useCallback } from "react";
import styles from "./HeadingText.module.scss";
import moment from "moment";
import { useSelector } from "react-redux";

const HeadingText = () => {
	const userName = useSelector(state => state.auth.userData.name);

	const [isNewDay, setIsNewDay] = useState(false);
	const [isNewHour, setIsNewHour] = useState(false);
	const [weekDayName, setWeekDayName] = useState(moment().format("dddd"));
	const [month, setMonth] = useState(moment().format("MMMM"));
	const [monthDay, setMonthDay] = useState(moment().format("D"));
	const [welcomeText, setWelcomeText] = useState(null);

	const newDayHandler = useCallback(() => {
		const endOfDay = moment().endOf("day");
		const timeToEndDay = endOfDay.diff(moment());

		setTimeout(() => {
			setIsNewDay(true);
			setTimeout(() => {
				setIsNewDay(false);
			}, 1000);
			const newDate = moment().add(1, "day").startOf("day");
			setWeekDayName(newDate.format("dddd"));
			setMonth(newDate.format("MMMM"));
			setMonthDay(newDate.format("D"));
		}, timeToEndDay);
	}, []);

	const welcomeTextHandler = hour => {
		if (hour >= 6 && hour < 12) setWelcomeText("Good Morning");
		else if (hour >= 12 && hour < 18) setWelcomeText("Good Afternoon");
		else if (hour >= 18 && hour < 22) setWelcomeText("Good Evening");
		else setWelcomeText("Good Night");
	};

	const hoursHandler = useCallback(() => {
		const currentHour = moment().format("HH");
		welcomeTextHandler(+currentHour);
		const endOfHour = moment().endOf("hour");
		const timeToEndHour = endOfHour.diff(moment());

		setTimeout(() => {
			setIsNewHour(true);

			setTimeout(() => {
				setIsNewHour(false);
			}, 1000);
			const newHour = moment().add(1, "hour").startOf("hour").format("HH");
			welcomeTextHandler(+newHour);
		}, timeToEndHour);
	}, []);

	useEffect(() => {
		newDayHandler();
		hoursHandler();
	}, [newDayHandler, isNewDay, hoursHandler, isNewHour]);

	return (
		<Fragment>
			{welcomeText && (
				<div className={styles.box}>
					<p>
						{weekDayName}, {month} {monthDay}
					</p>
					<h1>
						{welcomeText}, {userName}
					</h1>
				</div>
			)}
		</Fragment>
	);
};

export default HeadingText;
