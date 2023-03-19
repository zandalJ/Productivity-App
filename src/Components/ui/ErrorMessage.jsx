import styles from "./ErrorMessage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const ErrorMessage = ({ message }) => {
	return (
		<div className={styles["message-box"]}>
			<FontAwesomeIcon icon={solid("circle-exclamation")} />
			<p>{message}</p>
		</div>
	);
};

export default ErrorMessage;
