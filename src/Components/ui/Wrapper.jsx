import styles from "./Wrapper.module.scss";
const Wrapper = ({ children, center, className }) => {
	return (
		<div
			className={`${styles.wrapper} ${center ? styles.center : null} ${
				className ? className : null
			}`}>
			{children}
		</div>
	);
};

export default Wrapper;
