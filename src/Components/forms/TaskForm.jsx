import { Fragment, useState, useEffect, useCallback } from "react";
import styles from "./TaskForm.module.scss";
import styles2 from "./FormInput.module.scss";
import { useForm, Controller } from "react-hook-form";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import moment from "moment";
import SearchUser from "../searchUser/SearchUser";
import FormInput from "./FormInput";
import ErrorMessage from "../ui/ErrorMessage";
import { addTask } from "../../store/tasks-actions";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentDate } from "../../constants/currentDate";
import { useLocation, useParams } from "react-router-dom";
import { updateTask } from "../../store/tasks-actions";

const TaskForm = ({ showModal, modal, submitChange, children }) => {
	const location = useLocation();
	const { id } = useParams();
	const currentDate = getCurrentDate();
	const dispatch = useDispatch();
	const tasks = useSelector(state => state.tasks.tasks);
	const [task] = useState(id ? tasks[parseInt(id.replace(/\D/g, ""))] : {});

	const [selectedUsers, setSelectedUsers] = useState([]);
	const [resetUsers, setResetUsers] = useState(false);
	const [dateDefaultValue, setDateDefaultValue] = useState(
		moment(task.deadline) || moment()
	);

	const {
		register,
		formState: { errors },
		handleSubmit,
		control,
		reset,
	} = useForm();

	const resetFormHandler = useCallback(() => {
		setResetUsers(before => !before);
		setSelectedUsers([]);
		setDateDefaultValue(moment());
		reset();
	}, [reset]);

	const addUserHandler = useCallback(user => {
		setSelectedUsers([...user]);
	}, []);
	const addTaskHandler = data => {
		let lastId;
		tasks.length > 0 ? (lastId = tasks[tasks.length - 1].id) : (lastId = 0);
		const userId =
			tasks.length > 0
				? "task-" + (parseInt(lastId.match(/\d+/)[0]) + 1)
				: "task-" + lastId;
		const formData = {
			title: data.taskTitle,
			description: "" || data.taskDescription,
			members: [...selectedUsers] || [],
			deadline: data.taskDeadline._d,
			createDate: currentDate._d,
			updateDate: null,
			status: "progress",
			id: userId,
		};
		dispatch(addTask(formData));
		showModal();
		resetFormHandler();
	};

	const changeTaskHandler = async data => {
		const formData = {
			title: data.taskTitle,
			description: "" || data.taskDescription,
			members: [...selectedUsers] || [],
			deadline: data.taskDeadline._d,
			updateDate: currentDate._d,
			status: "progress",
		};
		dispatch(updateTask(formData, id));
		submitChange();
	};

	const submitHandler =
		location.pathname === "/tasks" ? addTaskHandler : changeTaskHandler;

	useEffect(() => {
		if (!modal) resetFormHandler();
		if (modal) setResetUsers(false);
	}, [modal, resetFormHandler]);

	return (
		<Fragment>
			{task && (
				<form onSubmit={handleSubmit(submitHandler)}>
					<div className={`${styles2["input-box"]} ${styles["input-box"]}`}>
						<FormInput
							title='Enter Task Title'
							name='taskTitle'
							type='text'
							defaultValue={task.title || ""}
							register={register}
							rules={{
								required: true,
								maxLength: 15,
							}}
							errors={errors}
						/>
					</div>
					<div className={`${styles2["input-box"]} ${styles["input-box"]}`}>
						<label>Enter Task Description</label>
						<textarea
							{...register("taskDescription", {
								required: false,
							})}
							defaultValue={task.description || ""}
							placeholder='Enter Task Description'></textarea>
					</div>
					<Fragment>
						<Controller
							control={control}
							name='taskDeadline'
							defaultValue={dateDefaultValue}
							rules={{
								required: "Choose Date",
								validate: {
									min: date =>
										moment(date).isAfter(moment(task.createDate) || moment()) ||
										"Enter a valid date",
								},
							}}
							render={({ field: { onChange, onBlur, value } }) => (
								<DateTimePicker
									label='Choose Deadline'
									className={styles.date}
									value={value}
									onChange={onChange}
									onBlur={onBlur}
									desktopModeMediaQuery='@media(min-width:992px)'
								/>
							)}
						/>
						{errors.taskDeadline && (
							<ErrorMessage message={errors.taskDeadline.message} />
						)}
					</Fragment>
					<SearchUser
						className={styles2["input-box"]}
						addUsers={addUserHandler}
						resetUsers={resetUsers}
						fetchedUsers={task.members || []}
					/>
					{children}
				</form>
			)}
		</Fragment>
	);
};

export default TaskForm;
