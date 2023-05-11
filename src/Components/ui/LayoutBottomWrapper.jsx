import styles from "./LayoutBottomWrapper.module.scss";
const LayoutBottomWrapper = ({ style, children, className }) => {
	return (
		<div
			className={`${styles.wrapper} ${className ? className : ""}`}
			style={style ? style : null}>
			{children}
		</div>
	);
};

export default LayoutBottomWrapper;
