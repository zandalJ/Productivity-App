import styles from "./DeleteAccountConfirm.module.scss";
import Button from "../ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { userAuthDataUpdate } from "../../store/auth-actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const DeleteAccountConfirm = ({ showModal }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const tasksCount = useSelector(state => state.tasks.tasks.length);
	const habitsCount = useSelector(state => state.habits.habits.length);

	const deleteAccountHandler = async () => {
		await dispatch(userAuthDataUpdate({}, false, true));
		showModal();
		navigate("/register");
	};

	return (
		<div className={styles.box}>
			<div className={styles["info-text-box"]}>
				<p>Are you sure you want to delete your account?</p>
				<p>You can't undo this action</p>
			</div>
			<div className={styles["warning-box"]}>
				<p className={styles["warning-box__heading"]}>Warning</p>
				<p className={styles["warning-box__text"]}>
					By deleting this account
					<span className={styles["warning-box__text--bold"]}>
						{" "}
						{tasksCount} tasks{" "}
					</span>
					and
					<span className={styles["warning-box__text--bold"]}>
						{" "}
						{habitsCount} habits{" "}
					</span>
					will also be deleted.
				</p>
				<div className={styles["warning-box__icon"]}>
					<FontAwesomeIcon icon={solid("triangle-exclamation")} />
				</div>
			</div>
			<div className={styles["button-box"]}>
				<Button onClick={showModal}>Cancel</Button>
				<Button
					className={styles["error-button"]}
					onClick={deleteAccountHandler}>
					Delete <FontAwesomeIcon icon={solid("trash-can")} />
				</Button>
			</div>
		</div>
	);
};

export default DeleteAccountConfirm;
