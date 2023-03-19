import { Fragment, useState } from "react";
import styles from "./AddForm.module.scss";
import styles2 from "./FormInput.module.scss";
import { useForm, Controller } from "react-hook-form";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import moment from "moment";
import Button from "../ui/Button";
import SearchUser from "../searchUser/SearchUser";
import FormInput from "./FormInput";

const AddForm = ({ elements }) => {
	const [selectedUsers, setSelectedUsers] = useState([]);
	const {
		register,
		formState: { errors },
		handleSubmit,
		control,
	} = useForm();

	const addUserHandler = user => {
		setSelectedUsers([...user]);
	};

	const submitHandler = data => {
		const formData = { ...data, selectedUsers: { ...selectedUsers } };
		console.log(formData);
	};

	return (
		<Fragment>
			<form onSubmit={handleSubmit(submitHandler)}>
				{elements.input
					? elements.input.map((element, index) => {
							let name = element.name;
							return (
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
							rules={{
								required: true,
								validate: {
									min: date =>
										moment(date).isAfter(moment()) || "Enter a valid date",
								},
							}}
							render={({ field: { onChange, onBlur, ref } }) => (
								<DateTimePicker
									label='Choose Date'
									className={styles.date}
									inputRef={ref}
									onChange={onChange}
									onBlur={onBlur}
									desktopModeMediaQuery='@media(min-width:992px)'
								/>
							)}
						/>
						{errors.taskDeadline && (
							<p className={styles["error-msg"]}>
								{errors.taskDeadline.message}
							</p>
						)}
					</Fragment>
				) : null}
				{elements.membersSelect ? (
					<SearchUser
						className={styles2["input-box"]}
						addUsers={addUserHandler}
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
