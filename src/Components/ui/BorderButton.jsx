import styles from "./BorderButton.module.scss";

const BorderButton = ({ children, className, onClick, dataAttribute }) => {
	let attribute = {}
	if(dataAttribute){
		const key = `data-${dataAttribute.key}`;
		attribute[key] = dataAttribute.value;
	}
	
	return (
		<button
			className={`${styles.button} ${className ? className : null}`}
			onClick = {onClick}
			type='button'
			{...attribute}
			>
			{children}
		</button>
	);
};

export default BorderButton;
