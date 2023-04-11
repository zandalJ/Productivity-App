import styles from "./DayCircle.module.scss";

const DayCircle = ({ number, active }) => {
	return (
		<button className={`${styles.btn} ${active ? styles.active : ""}`}>
			{number}
		</button>
	);
};

export default DayCircle;
