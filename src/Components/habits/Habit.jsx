import { Fragment, useState } from "react";
import styles from "./Habit.module.scss";
import Card from "../ui/Card";
import ProgressCircle from "./ProgressCircle";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useDispatch, useSelector } from "react-redux";
import { resetHabitValue } from "../../store/habits-actions";
import Modal from "../ui/modal/Modal";
import AddHabitValue from "./AddHabitValue";

const Habit = ({ data, detail, className }) => {

	const habits = useSelector(state => state.habits.habits)
	const habit = habits.filter(habit => habit.id === data.id)

	const [showModal, setShowModal] = useState(false);

	const showModalHandler = () => {
		setShowModal(before => !before);
	};

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const resetHabitValueHandler = async () => {
		await dispatch(resetHabitValue(data.id));
	};

	return (
		<Fragment>
			{detail ? (
				<Fragment>
					<Card
						className={`${styles["habit-card"]} ${className ? className : ""}`}>
						<h2 className={styles["habit-card__title"]}>{data.name}</h2>
						<ProgressCircle
							unit={data.goal.unit}
							maxValue={data.goal.maxValue}
							currentValue={data.goal.currentValue}
							habitColor={habit[0].color}
						/>
						<div className={styles["habit-card__detail-tools"]}>
							<button
								className={styles["habit-card__detail-tools__button"]}
								style={{ backgroundColor: data.color }}
								onClick={showModalHandler}>
								<FontAwesomeIcon icon={solid("plus")} />
							</button>
							<button
								className={styles["habit-card__detail-tools__button"]}
								style={{ backgroundColor: data.color }}
								onClick={resetHabitValueHandler}>
								<FontAwesomeIcon icon={solid("rotate-right")} />
							</button>
						</div>
					</Card>
					<Modal modal={showModal} showModal={showModalHandler}>
						<AddHabitValue showModal={showModalHandler} />
					</Modal>
				</Fragment>
			) : (
				<Card
					className={styles["habit-card"]}
					onClick={() => navigate(`/habits/${data.id}`)}>
					<h2 className={styles["habit-card__title"]}>{data.name}</h2>
					<ProgressCircle
						unit={data.goal.unit}
						maxValue={data.goal.maxValue}
						currentValue={data.goal.currentValue}
						habitColor={habit[0].color}
					/>
				</Card>
			)}
		</Fragment>
	);
};

export default Habit;
