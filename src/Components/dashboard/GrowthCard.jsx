import styles from './GrowthCard.module.scss'
import Card from "../ui/Card";
const GrowthCard = ({title, color}) => {
    return (
			<Card className={styles['growth-card']}>
				<div className={styles["growth-card__header-box"]}>
					<p
						className={`${styles["growth-card__text"]} ${styles[`growth-card__text--${color}`]}`}>
						{title}
					</p>
					<p className={styles["growth-card__number-count"]}>18</p>
				</div>
				<p className={styles["growth-card__description"]}>
					<span className={styles["growth-card__description--percentage"]}>
						+10%
					</span>
					more from the last week
				</p>
			</Card>
		);
}

export default GrowthCard;