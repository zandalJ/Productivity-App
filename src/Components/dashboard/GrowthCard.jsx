import { Fragment } from "react";
import styles from "./GrowthCard.module.scss";
import Card from "../ui/Card";

const GrowthCard = ({ data, title, color }) => {
	return (
		<Fragment>
			<Card className={styles["growth-card"]}>
				<div className={styles["growth-card__header-box"]}>
					<p
						className={`${styles["growth-card__text"]} ${
							styles[`growth-card__text--${color}`]
						}`}>
						{title}
					</p>
					<p className={styles["growth-card__number-count"]}>{data.count}</p>
				</div>
				<p className={styles["growth-card__description"]}>
					<span className={styles["growth-card__description--percentage"]}>
						{`+${Math.round(data.percentage)}%`}
					</span>
					more from the last week
				</p>
			</Card>
		</Fragment>
	);
};

export default GrowthCard;
