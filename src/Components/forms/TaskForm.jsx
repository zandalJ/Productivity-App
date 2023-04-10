import { Fragment, useState, useEffect, useCallback, useRef } from "react";
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

const TaskForm = ({ showModal, modal, children }) => {
	const location = useLocation();
	const { id } = useParams();
	const currentDate = getCurrentDate();
	const dispatch = useDispatch();
	const tasks = useSelector(state => state.tasks.tasks);
	
	let stateDafeultDate;
	// useEffect(() => {
	// 	if (location.pathname === "/tasks") {
	// 		stateDafeultDate = moment();
	// 	} else {
	// 		const task = tasks[parseInt(id.replace(/\D/g, ""))];
	// 		stateDafeultDate = moment(task.deadline);
	// 	}
	// }, []);

	const [selectedUsers, setSelectedUsers] = useState([]);
	const [resetUsers, setResetUsers] = useState(false);
	const [dateDefaultValue, setDateDefaultValue] = useState(stateDafeultDate);

	const {
		register,
		formState: { errors },
		handleSubmit,
		control,
		reset,
	} = useForm();

	const addUserHandler = user => {
		setSelectedUsers([...user]);
	};

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

	const changeTaskHandler = data => {
		const formData = {
			title: data.taskTitle,
			description: "" || data.taskDescription,
			members: [...selectedUsers] || [],
			deadline: data.taskDeadline._d,
			updateDate: currentDate._d,
			status: "progress",
		};

		dispatch(updateTask(formData, id));
	};

	const submitHandler =
		location.pathname === "/tasks" ? addTaskHandler : changeTaskHandler;

	const resetFormHandler = useCallback(() => {
		setResetUsers(before => !before);
		setSelectedUsers([]);
		setDateDefaultValue(moment());
		reset();
	}, [reset]);

	useEffect(() => {
		if (!modal) resetFormHandler();
		if (modal) setResetUsers(false);
	}, [modal, resetFormHandler]);

	return (
		<form onSubmit={handleSubmit(submitHandler)}>
			<FormInput
				title='Enter Task Title'
				name='taskTitle'
				type='text'
				register={register}
				rules={{
					required: true,
					maxLength: 15,
				}}
				errors={errors}
			/>
			<div className={`${styles2["input-box"]} ${styles["input-box"]}`}>
				<label>Enter Task Description</label>
				<textarea
					{...register("taskDescription", {
						required: false,
					})}
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
								moment(date).isAfter(moment()) || "Enter a valid date",
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
			/>
			{children}
		</form>
	);
};

export default TaskForm;
