import styles from "./Fieldset.module.scss";

const Fieldset = ({ title, options, type }) => {
    const optionsOutput = options.map((option, index) => (
			<div className={styles["wrapper--option"]} key={index}>
				<input type='radio' value={option} name={type} id={option} />
				<label htmlFor={option}>{option}</label>
			</div>
		));
	return (
		<fieldset className={styles.wrapper}>
			<legend>{title}</legend>
			{optionsOutput}
		</fieldset>
	);
};

export default Fieldset;
