import { useEffect, useState } from "react";
import styles from "./Stats.module.scss";
import Card from "../ui/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Stats = ({ data, title, icon, color }) => {
	const [statsCount, setStatsCount] = useState(0);
	
	useEffect(() => {
		if (title === "All Tasks") {
			setStatsCount(data.length);
		} else if (title === "Completed Tasks") {
			setStatsCount(data.length);
		} else if (title === "New Tasks") {
			setStatsCount(data.count);
		} else if (title === "Habbits Streak") {
			setStatsCount(0);
		}
	}, [title, data]);

	return (
		<Card className={styles.card}>
			<div className={styles["card__text"]}>
				<FontAwesomeIcon icon={icon} className={styles["card__icon"]} />
				<p>{title}</p>
			</div>
			<p
				className={`${styles["card__number"]} ${
					styles[`card__number--${color}`]
				}`}>
				{statsCount}
			</p>
		</Card>
	);
};

export default Stats;
