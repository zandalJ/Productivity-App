import styles from "./LayoutBottomWrapper.module.scss";
const LayoutBottomWrapper = ({ children }) => {
	return <div className={styles.wrapper}>{children}</div>;
};

export default LayoutBottomWrapper;
