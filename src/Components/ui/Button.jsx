import styles from "./Button.module.scss";

const Button = ({ children, color }) => {
	return (
		<button
			className={`${styles.button} ${
				color ? styles[`button--${color} `] : null
			}`}>
			{children}
		</button>
	);
};

export default Button;
