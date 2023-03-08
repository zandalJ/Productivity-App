import styles from "./ProgressBar.module.scss";

const ProgressBar = ({ progress }) => {
	return (
		<div className={styles["bar-container"]}>
			<p>{progress}%</p>
			<div className={styles.bar}>
                <div className={styles.progress} style={{width: `${progress}%`}}></div>
            </div>
		</div>
	);
};

export default ProgressBar;
