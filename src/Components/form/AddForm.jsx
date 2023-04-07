import { Fragment, useState, useEffect, useCallback } from "react";
import styles from "./AddForm.module.scss";
import styles2 from "./FormInput.module.scss";
import { useForm, Controller } from "react-hook-form";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import moment from "moment";
import Button from "../ui/Button";
import SearchUser from "../searchUser/SearchUser";
import FormInput from "./FormInput";
import ErrorMessage from "../ui/ErrorMessage";
import { addTask } from "../../store/tasks-actions";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentDate } from "../../constants/currentDate";

const AddForm = ({ elements, showModal, modal }) => {
	const currentDate = getCurrentDate();
	const dispatch = useDispatch();
	const tasks = useSelector(state => state.tasks.tasks);
	const [selectedUsers, setSelectedUsers] = useState([]);
	const [resetUsers, setResetUsers] = useState(false);
	const [dateDefaultValue, setDateDefaultValue] = useState(moment());

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

	const submitHandler = data => {
		const id =
			tasks.length > 0
				? "task-" + (tasks[tasks.length - 1].id + 1)
				: "task-" + 0;
		const formData = {
			title: data.taskTitle,
			description: "" || data.taskDescription,
			members: [...selectedUsers] || [],
			deadline: data.taskDeadline._d,
			createDate: currentDate._d,
			status: "progress",
			id: id,
		};
		dispatch(addTask(formData));
		showModal();
		resetFormHandler();
	};

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
		<Fragment>
			<form onSubmit={handleSubmit(submitHandler)}>
				{elements.input
					? elements.input.map((element, index) => {
							return (
								<div key={index}>
									<FormInput
										title={element.label}
										name={element.name}
										type='text'
										register={register}
										rules={{
											required: element.required,
											maxLength: element.maxLength,
										}}
										errors={errors}
									/>
								</div>
							);
					  })
					: null}
				{elements.textarea
					? elements.textarea.map((element, index) => {
							return (
								<div
									key={index}
									className={`${styles2["input-box"]} ${styles["input-box"]}`}>
									<label>{element.label}</label>
									<textarea
										{...register(element.name, {
											required: element.required,
										})}
										placeholder={element.label}></textarea>
								</div>
							);
					  })
					: null}
				{elements.datePicker ? (
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
									label='Choose Date'
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
				) : null}
				{elements.membersSelect ? (
					<SearchUser
						className={styles2["input-box"]}
						addUsers={addUserHandler}
						resetUsers={resetUsers}
					/>
				) : null}
				<Button submit className={styles.btn}>
					Add Task
				</Button>
			</form>
		</Fragment>
	);
};

export default AddForm;
