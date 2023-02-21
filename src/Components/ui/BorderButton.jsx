import styles from "./BorderButton.module.scss";

const BorderButton = ({ children, color }) => {
	return (
		<button
			className={`${styles.button} ${
				color ? styles[`button--${color}`] : null
			}`}>
			{children}
		</button>
	);
};

export default BorderButton;
