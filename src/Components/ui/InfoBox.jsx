import styles from "./InfoBox.module.scss";

const InfoBox = ({ title, data, borderColor = "main" }) => {

	return (
		<div
			className={
				borderColor === "main"
					? `${styles.box} ${styles["box__main-border"]}`
					: `${styles.box} ${styles["box__sec-border"]}`
			}>
			<p className={styles["box__title"]}>{title}</p>
			<p className={styles["box__data"]}>{data}</p>
		</div>
	);
};

export default InfoBox;
