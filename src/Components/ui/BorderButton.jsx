import styles from "./BorderButton.module.scss";

const BorderButton = ({ children, className }) => {
	return (
		<button
			className={`${styles.button} ${className ? className : null}`}
			type='button'>
			{children}
		</button>
	);
};

export default BorderButton;
