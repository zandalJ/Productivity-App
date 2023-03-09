import React from "react";
import styles from "./Button.module.scss";

const Button = React.forwardRef(({ children, color, className, onClick }, ref) => {
	return (
		<button
			className={`${styles.button} ${
				color ? styles[`button--${color} `] : null
			} ${className ? className : null}`}
			ref={ref}
			onClick={onClick}>
			{children}
		</button>
	);
});

export default Button;
