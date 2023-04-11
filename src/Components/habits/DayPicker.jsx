import styles from "./DayPicker.module.scss";
import DaySlider from "./DaySlider";

const DayPicker = () => {
	return (
		<div className={styles.box}>
			<div className={styles["slider-box"]}>
				<DaySlider />
			</div>
			<div className={styles["calendar-box"]}></div>
		</div>
	);
};

export default DayPicker;
