import styles from './Calendar.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const Calendar = () => {
    return (
			<button className={styles.btn}>
				<FontAwesomeIcon icon={solid("calendar-days")} />
			</button>
		);
}

export default Calendar