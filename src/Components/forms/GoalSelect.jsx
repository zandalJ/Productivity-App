import { Fragment, useState, useEffect } from "react";
import styles from "./GoalSelect.module.scss";
import Modal from "../ui/modal/Modal";

const GoalSelect = ({ register, setValue, resetGoal }) => {
	const [showModal, setShowModal] = useState(false);
	const showModalHandler = () => setShowModal(before => !before);

	const [goalValue, setGoalValue] = useState(6);
	const [unit, setUnit] = useState("ml");
	const [frequency, setFrequency] = useState("day");

	const unitHandler = e => {
		setUnit(e.target.dataset.unit);
		setValue("goalUnit", e.target.dataset.unit);
		showModalHandler();
	};

	const frequencyHandler = e => {
		setFrequency(e.target.dataset.frequency);
		setValue("goalFrequency", e.target.dataset.frequency);
	};

	useEffect(() => {
		if (resetGoal) {
			setGoalValue(6);
			setUnit("ml");
			setFrequency("day");
		}
	}, [resetGoal]);

	return (
		<Fragment>
			<div className={styles["inputs-box"]}>
				<label>Goal</label>
				<div className={styles["inputs-box__inputs"]}>
					<input
						type='number'
						value={goalValue}
						onInput={(e) => setGoalValue(e.target.value)}
						name='goalAmount'
						{...(register && register("goalAmount"))}
					/>
					<button
						className={styles["inputs-box__inputs__button"]}
						type='button'
						onClick={showModalHandler}
						value={unit}
						defaultValue='ml'
						name='goalUnit'
						{...(register && register("goalUnit"))}>
						{unit}
					</button>
					<div className={styles["sloping-line"]}></div>
					<button
						className={`${styles["inputs-box__inputs__button"]} ${
							styles["inputs-box__inputs__button--frequency"]
						} ${
							frequency === "day"
								? styles["inputs-box__inputs__button--frequency--active"]
								: ""
						}`}
						type='button'
						data-frequency='day'
						onClick={frequencyHandler}
						{...(register && register("goalFrequency"))}>
						day
					</button>
					<button
						className={`${styles["inputs-box__inputs__button"]} ${
							styles["inputs-box__inputs__button--frequency"]
						} ${
							frequency === "week"
								? styles["inputs-box__inputs__button--frequency--active"]
								: ""
						}`}
						type='button'
						data-frequency='week'
						onClick={frequencyHandler}>
						week
					</button>
				</div>
			</div>
			<Modal showModal={showModalHandler} modal={showModal}>
				<div className={styles["units-box"]}>
					<div className={styles["units-box__row"]}>
						<button type='button' data-unit='m' onClick={unitHandler}>
							m
						</button>
						<button type='button' data-unit='km' onClick={unitHandler}>
							km
						</button>
						<button type='button' data-unit='sec' onClick={unitHandler}>
							sec
						</button>
					</div>
					<div className={styles["units-box__row"]}>
						<button type='button' data-unit='min' onClick={unitHandler}>
							min
						</button>
						<button type='button' data-unit='hr' onClick={unitHandler}>
							hr
						</button>
						<button type='button' data-unit='ml' onClick={unitHandler}>
							ml
						</button>
					</div>
				</div>
			</Modal>
		</Fragment>
	);
};

export default GoalSelect;
