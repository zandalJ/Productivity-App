import styles from "./CreateTaskModalContent.module.scss";
import AddTaskForm from "../../forms/TaskForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import Button from "../Button";

const CreateTaskModalContent = ({ showModal, modal }) => {
	return (
		<div className={styles["content-box"]}>
			<FontAwesomeIcon
				icon={solid("xmark")}
				onClick={showModal}
				className={styles.icon}
			/>
			<h2 className={styles["heading-text"]}>Create New Task</h2>
			<div className={styles.line}></div>
			<AddTaskForm showModal={showModal} modal={modal}>
				<Button submit className={styles.btn}>
					Add Task
				</Button>
			</AddTaskForm>
		</div>
	);
};

export default CreateTaskModalContent;
