import styles from "./Card.module.scss";
const Card = ({ children, className }) => {
	return (
		<div className={`${styles["card-box"]} ${className ? className : null}`}>
			{children}
		</div>
	);
};

export default Card;
