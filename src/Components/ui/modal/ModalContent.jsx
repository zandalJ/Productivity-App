import styles from "./ModalContent.module.scss";
import AddForm from "../../form/AddForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const formElements = {
	tasks: {
		input: [
			{
				name: "taskTitle",
				label: "Enter Task Title",
				required: true,
				maxLength: 15,
			},
		],
		textarea: [
			{
				name: "taskDescription",
				label: "Enter Task Description",
				required: false,
			},
		],
		datePicker: true,
		membersSelect: true,
	},
};

const ModalContent = ({ location, showModal }) => {
	let modalHeading;

	if (location === "/tasks") {
		modalHeading = "Create New Task";
	} else if (location === "/habits") {
		modalHeading = "Create New Habit";
	}

	const elementsObjChoose = location.slice(1);

	return (
		<div className={styles["content-box"]}>
			<FontAwesomeIcon icon={solid("xmark")} onClick={showModal} className={styles.icon}/>
			<h2 className={styles["heading-text"]}>{modalHeading}</h2>
			<div className={styles.line}></div>
			<AddForm elements={formElements[elementsObjChoose]} />
		</div>
	);
};

export default ModalContent;
