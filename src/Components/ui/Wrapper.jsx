import styles from "./Wrapper.module.scss";
const Wrapper = ({ children, center }) => {
	return (
		<div
			className={`${styles.wrapper} ${center ? styles.center : null}`}>
			{children}
		</div>
	);
};

export default Wrapper;
