import styles from "./LayoutBottomWrapper.module.scss";
const LayoutBottomWrapper = ({ style, children }) => {
	return (
		<div className={styles.wrapper} style={style ? style : null}>
			{children}
		</div>
	);
};

export default LayoutBottomWrapper;
