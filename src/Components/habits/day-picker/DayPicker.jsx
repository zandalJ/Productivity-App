import styles from "./DayPicker.module.scss";
import DaySlider from "./DaySlider";
import Calendar from "./Calendar";

const DayPicker = () => {
	return (
		<div className={styles.box}>
			<div className={styles["slider-box"]}>
				<DaySlider />
			</div>
			<div className={styles["calendar-box"]}>
				<Calendar />
			</div>
		</div>
	);
};

export default DayPicker;

// logika ma byc taka, ze ostatnim dniem w sliderze jest obecny dzien i mozna przewinac 30 dni do tylu, a jak wybierze sie date z kalendarza to analogicznie ostatnim dniem w sliderze jest wybrany dzien + 30 dni do tyłu
