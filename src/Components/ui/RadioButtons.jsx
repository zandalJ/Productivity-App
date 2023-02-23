import styles from "./RadioButtons.module.scss";

const RadioButtons = ({ options, type }) => {
	const output = options.map((option, index) => (
		<div className={styles["option-wrapper"]} key={index}>
			<input type='radio' value={option} name={type} id={option} />
			<label htmlFor={option}>{option}</label>
		</div>
	));

	return <div className={styles.wrapper}>{output}</div>;
};

export default RadioButtons;
