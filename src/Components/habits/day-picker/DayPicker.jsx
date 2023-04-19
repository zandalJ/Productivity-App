import { useState } from "react";
import styles from "./DayPicker.module.scss";
import DaySlider from "./DaySlider";
import Calendar from "./Calendar";
import { getCurrentDate } from "../../../constants/currentDate";
import moment from "moment";

const DayPicker = () => {
	const currentDate = getCurrentDate;
	const [currentDay, setCurrentDay] = useState(currentDate);
	const choosenDayHandler = day => {
		setCurrentDay(moment().date(day));
	};

	return (
		<div className={styles.box}>
			<div className={styles["slider-box"]}>
				<DaySlider
					currentDay={currentDay}
					setCurrentDay={choosenDayHandler}
				/>
			</div>
			<div className={styles["calendar-box"]}>
				<Calendar currentDay={currentDay} setCurrentDay={choosenDayHandler} />
			</div>
		</div>
	);
};

export default DayPicker;

// logika ma byc taka, ze ostatnim dniem w sliderze jest obecny dzien i mozna przewinac 30 dni do tylu, a jak wybierze sie date z kalendarza to analogicznie ostatnim dniem w sliderze jest wybrany dzien + 30 dni do tyłu
