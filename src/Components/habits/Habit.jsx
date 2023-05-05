import { Fragment } from "react";
import styles from "./Habit.module.scss";
import Card from "../ui/Card";
import ProgressCircle from "./ProgressCircle";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const Habit = ({ data, detail, className }) => {
	const navigate = useNavigate();

	return (
		<Fragment>
			{detail ? (
				<Card
					className={`${styles["habit-card"]} ${className ? className : ""}`}>
					<h2 className={styles["habit-card__title"]}>{data.title}</h2>
					<ProgressCircle
						unit={data.unit}
						maxValue={data.maxValue}
						currentValue={data.currentValue}
					/>
					<div className={styles["habit-card__detail-tools"]}>
						<button className={styles["habit-card__detail-tools__button"]}>
							<FontAwesomeIcon icon={solid("plus")} />
						</button>
						<button className={styles["habit-card__detail-tools__button"]}>
							<FontAwesomeIcon icon={solid("rotate-right")} />
						</button>
					</div>
				</Card>
			) : (
				<Card
					className={styles["habit-card"]}
					onClick={() => navigate(`/habits/${data.id}`)}>
					<h2 className={styles["habit-card__title"]}>{data.title}</h2>
					<ProgressCircle
						unit={data.unit}
						maxValue={data.maxValue}
						currentValue={data.currentValue}
					/>
				</Card>
			)}
		</Fragment>
	);
};

export default Habit;
