import styles from "./Card.module.scss";
const Card = ({ children, className, onClick }) => {
	return (
		<div
			className={`${styles["card-box"]} ${className ? className : null}`}
			onClick={onClick}>
			{children}
		</div>
	);
};

export default Card;
