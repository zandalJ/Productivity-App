import { useState, Fragment } from "react";
import styles from "./ColorSelect.module.scss";
import { motion } from "framer-motion";
import Modal from "../ui/modal/Modal";

const colors = {
	lightBlue: "#2192ff",
	lightPurple: "#a654ed",
	lightGreen: "#13b57a",
};

const ColorSelect = () => {
	const [showModal, setShowModal] = useState(false);
	const showModalHandler = () => setShowModal(before => !before);

	const [colorValue, setColorValue] = useState(colors.lightBlue);

	const colorHandler = e => {
		setColorValue(colors[e.target.dataset.color]);
		showModalHandler();
	};

	return (
		<Fragment>
			<motion.button
				type='button'
				className={styles["choosed-color-button"]}
				value={colorValue}
				style={{ backgroundColor: colorValue }}
				whileHover={{
					opacity: 0.85,
					transition: { duration: 0.2 },
				}}
				onClick={showModalHandler}></motion.button>
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
