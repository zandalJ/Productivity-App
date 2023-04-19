import styles from "./Calendar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { DateCalendar } from "@mui/x-date-pickers";
import { getCurrentDate } from "../../../constants/currentDate";

const Calendar = () => {
	const currentDate = getCurrentDate;
	return (
		<div className={styles.box}>
			<button className={styles.btn}>
				<FontAwesomeIcon icon={solid("calendar-days")} />
			</button>
			{/* <DateCalendar
				className={styles.calendar}
				defaultValue={currentDate}
				disablePast
			/> */}
		</div>
	);
};

export default Calendar;
