import styles from "./CreateFormModalContent.module.scss";
import AddTaskForm from "../../forms/TaskForm";
import AddHabitForm from "../../forms/HabitForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import Button from "../Button";
import { useLocation } from "react-router-dom";

const CreateFormModalContent = ({ showModal, modal }) => {
	const location = useLocation().pathname;

	const titleText =
		location === "/tasks" ? "Create New Task" : "Create New Habit";

	return (
		<div className={styles["content-box"]}>
			<FontAwesomeIcon
				icon={solid("xmark")}
				onClick={showModal}
				className={styles.icon}
			/>
			<h2 className={styles["heading-text"]}>{titleText}</h2>
			<div className={styles.line}></div>
			{location === "/tasks" ? (
				<AddTaskForm showModal={showModal} modal={modal}>
					<Button submit className={styles.btn}>
						Add Task
					</Button>
				</AddTaskForm>
			) : (
				<AddHabitForm showModal={showModal} modal={modal}>
					<Button submit className={styles.btn}>
						Add Habit
					</Button>
				</AddHabitForm>
			)}
		</div>
	);
};

export default CreateFormModalContent;
