import styles from './LoadingSpinner.module.scss'
import CircularProgress from "@mui/material/CircularProgress";

const LoadingSpinner = () => {
	return (
		<div className={styles.box}>
			<CircularProgress />
		</div>
	);
};

export default LoadingSpinner;
