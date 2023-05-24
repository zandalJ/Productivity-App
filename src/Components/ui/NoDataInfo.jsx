import styles from "./NoDataInfo.module.scss";

const NoDataInfo = ({ message }) => {
	return <p className={styles.text}>{message}</p>;
};

export default NoDataInfo;
