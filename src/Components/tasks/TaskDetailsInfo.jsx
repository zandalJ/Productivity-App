import TaskInfoBox from "./TaskInfoBox";
import moment from "moment";

const TaskDetailsInfo = ({ data }) => {
	const createDate = moment(data.createDate).format("DD.MM.YYYY");
	const createHour = moment(data.createDate).format("HH:mm");
	const createTime = `${createDate} at ${createHour}`;

	const editDate = moment(data.updateDate).format("DD.MM.YYYY");
	const editHour = moment(data.updateDate).format("HH:mm");
	const updateTime = `${editDate} at ${editHour}`;

	const status = `${data.status.charAt(0).toUpperCase()}${data.status.slice(
		1
	)}`;

	return (
		<div>
			<TaskInfoBox title='Create date' data={createTime} />
			<TaskInfoBox title='Last edit' data={updateTime} />
			<TaskInfoBox title='Status' data={status} />
		</div>
	);
};

export default TaskDetailsInfo;
