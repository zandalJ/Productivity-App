import { Fragment } from "react";
import { createPortal } from "react-dom";
import styles from "./LoadingSpinner.module.scss";
import CircularProgress from "@mui/material/CircularProgress";

const LoadingSpinner = () => {
	return (
		<Fragment>
			{createPortal(
				<div className={styles.box}>
					<CircularProgress />
				</div>,
				document.getElementById('spinner-root')
			)}
		</Fragment>
	);
};

export default LoadingSpinner;
