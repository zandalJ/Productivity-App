import styles from "./CreateFormModalContent.module.scss";
import AddTaskForm from "../../forms/TaskForm";
import AddHabitForm from "../../forms/HabitForm";
import AddTeamMembersForm from "../../forms/TeamMembersForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import Button from "../Button";
import { useLocation } from "react-router-dom";

const CreateFormModalContent = ({ showModal, modal }) => {
	const location = useLocation().pathname;

	let titleText;
	let formOutput;
	if (location === "/tasks") {
		titleText = "Create New Task";
		formOutput = (
			<AddTaskForm showModal={showModal} modal={modal}>
				<Button submit className={styles.btn}>
					Add Task
				</Button>
			</AddTaskForm>
		);
	} else if (location === "/habits") {
		titleText = "Create New Habit";
		formOutput = <AddHabitForm showModal={showModal} modal={modal} />;
	} else if (location === "/team-members") {
		titleText = "Add New User";
		formOutput = <AddTeamMembersForm showModal={showModal} modal={modal} />;
	}

	return (
		<div className={styles["content-box"]}>
			<FontAwesomeIcon
				icon={solid("xmark")}
				onClick={showModal}
				className={styles.icon}
			/>
			<h2 className={styles["heading-text"]}>{titleText}</h2>
			<div className={styles.line}></div>
			{formOutput}
		</div>
	);
};

export default CreateFormModalContent;
