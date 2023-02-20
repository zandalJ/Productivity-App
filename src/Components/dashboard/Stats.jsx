import styles from "./Stats.module.scss";
import Card from "../ui/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Stats = ({title,icon,color}) => {
	return <Card className={styles.card}>
		<div className={styles["card__text"]}>
			<FontAwesomeIcon
				icon={icon}
				className={styles["card__icon"]}
			/>
			<p>{title}</p>
		</div>
		<p
			className={`${styles["card__number"]} ${styles[`card__number--${color}`]}`}>
			130
		</p>
	</Card>;
};

export default Stats;
