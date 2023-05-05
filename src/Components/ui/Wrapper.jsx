import styles from "./Wrapper.module.scss";
const Wrapper = ({ children, center, className }) => {
	return (
		<div
			className={`${styles.wrapper} ${center ? styles.center : ""} ${
				className ? className : ""
			}`}>
			{children}
		</div>
	);
};

export default Wrapper;
