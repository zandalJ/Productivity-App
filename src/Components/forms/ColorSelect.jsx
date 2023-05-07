import { useState, useEffect, Fragment } from "react";
import styles from "./ColorSelect.module.scss";
import { Controller } from "react-hook-form";
import { motion } from "framer-motion";
import Modal from "../ui/modal/Modal";

const colors = {
	lightBlue: "#2192ff",
	lightPurple: "#a654ed",
	lightGreen: "#13b57a",
};

const ColorSelect = ({ setValue, resetColor, control }) => {
	const [showModal, setShowModal] = useState(false);
	const showModalHandler = () => setShowModal(before => !before);

	const [colorValue, setColorValue] = useState(colors.lightBlue);

	const colorHandler = e => {
		setValue("buttonColor", colors[e.target.dataset.color]);
		setColorValue(colors[e.target.dataset.color]);
		showModalHandler();
	};

	useEffect(() => {
		if (resetColor) setColorValue(colors.lightBlue);
	}, [resetColor]);

	return (
		<Fragment>
			<div className={styles["choose-color-box"]}>
				<label>Color</label>
				<Controller
					control={control}
					name='buttonColor'
					defaultValue='#2192ff'
					render={({ field: { onChange, onBlur, value } }) => (
						<motion.button
							type='button'
							className={styles["choose-color-box__button"]}
							style={{ backgroundColor: colorValue }}
							whileHover={{
								opacity: 0.85,
								transition: { duration: 0.2 },
							}}
							onClick={showModalHandler}
							value={value}
							onChange={onChange}
							onBlur={onBlur}
						></motion.button>
					)}
				/>
			</div>
			<Modal showModal={showModalHandler} modal={showModal}>
				<div className={styles["color-pallete-box"]}>
					<button
						type='button'
						data-color='lightGreen'
						className={styles["color-pallete-box__button"]}
						onClick={colorHandler}></button>
					<button
						type='button'
						data-color='lightBlue'
						className={styles["color-pallete-box__button"]}
						onClick={colorHandler}></button>
					<button
						type='button'
						data-color='lightPurple'
						className={styles["color-pallete-box__button"]}
						onClick={colorHandler}></button>
				</div>
			</Modal>
		</Fragment>
	);
};

export default ColorSelect;
