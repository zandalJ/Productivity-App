import styles from "./ModalContent.module.scss";
import AddTaskForm from "../../forms/TaskForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import Button from "../../ui/Button";

const ModalContent = ({ location, showModal, modal }) => {
	let modalHeading;

	if (location === "/tasks") {
		modalHeading = "Create New Task";
	} else if (location === "/habits") {
		modalHeading = "Create New Habit";
	}

	return (
		<div className={styles["content-box"]}>
			<FontAwesomeIcon
				icon={solid("xmark")}
				onClick={showModal}
				className={styles.icon}
			/>
			<h2 className={styles["heading-text"]}>{modalHeading}</h2>
			<div className={styles.line}></div>
			<AddTaskForm showModal={showModal} modal={modal}>
				<Button submit className={styles.btn}>
					Add Task
				</Button>
			</AddTaskForm>
		</div>
	);
};

export default ModalContent;
