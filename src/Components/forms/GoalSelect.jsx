import { Fragment, useState } from "react";
import styles from "./GoalSelect.module.scss";
import Modal from "../ui/modal/Modal";

const GoalSelect = ({ register, setValue }) => {
	const [showModal, setShowModal] = useState(false);
	const showModalHandler = () => setShowModal(before => !before);

	const [unit, setUnit] = useState("ml");

	const unitHandler = e => {
		setUnit(e.target.dataset.unit);
		setValue("goalUnit", e.target.dataset.unit);
		showModalHandler();
	};

	return (
		<Fragment>
			<div className={styles["inputs-box"]}>
				<label>Goal</label>
				<div className={styles["inputs-box__inputs"]}>
					<input
						type='number'
						defaultValue={6}
						name='goalAmount'
						{...(register && register("goalAmount"))}
					/>
					<button
						type='button'
						onClick={showModalHandler}
						value={unit}
						defaultValue='ml'
						name='goalUnit'
						{...(register && register("goalUnit"))}>
						{unit}
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
