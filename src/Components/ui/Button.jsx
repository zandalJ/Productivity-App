import React from "react";
import styles from "./Button.module.scss";

const Button = React.forwardRef(
	({ children, color, className, onClick, submit }, ref) => {
		return (
			<button
				type={submit ? "submit" : "button"}
				className={`${styles.button} ${
					color ? styles[`button--${color} `] : ""
				} ${className ? className : ""}`}
				ref={ref}
				onClick={onClick}>
				{children}
			</button>
		);
	}
);

export default Button;
