import styles from "./LoadingSpinner.module.scss";
import CircularProgress from "@mui/material/CircularProgress";

const LoadingSpinner = ({ main = false }) => {
	return (
		<div className={main ? `${styles.box} ${styles["box__main"]}` : styles.box}>
			<CircularProgress />
		</div>
	);
};

export default LoadingSpinner;
