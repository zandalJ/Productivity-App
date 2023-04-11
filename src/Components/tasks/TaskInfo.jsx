import styles from "./TaskInfo.module.scss";
import TaskInfoBox from "./TaskInfoBox";
import moment from "moment";
import UserPhoto from "../ui/UserPhoto";
import Button from "../ui/Button";
import BorderButton from "../ui/BorderButton";
import { Link } from "react-router-dom";

const TaskInfo = ({ data, changeEdit }) => {
	const date = moment(data.deadline).format("DD.MM.YYYY");
	const hour = moment(data.deadline).format("HH:mm");
	const deadline = `${date} at ${hour}`;

	const members = data.members.map(member => {
		return (
			<UserPhoto
				key={member.id}
				size='40'
				href='https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
			/>
		);
	});
	return (
		<div className={styles.info}>
			<TaskInfoBox title='Title' data={data.title} />
			{data.description && (
				<TaskInfoBox title='Description' data={data.description} />
			)}
			<TaskInfoBox title='Deadline' data={deadline} />
			{data.members && (
				<div className={styles["info__members-box"]}>
					<p className={styles["info__members__title"]}>Members</p>
					<div className={styles["info__members"]}>{members}</div>
				</div>
			)}
			<div className={styles["info__buttons"]}>
				<Link to='/tasks'>
					<Button className={styles["info__buttons__btn"]}>Back</Button>
				</Link>
				<BorderButton
					className={styles["info__buttons__btn"]}
					onClick={changeEdit}>
					Edit
				</BorderButton>
			</div>
		</div>
	);
};

export default TaskInfo;
