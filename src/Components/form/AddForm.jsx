import { Fragment } from "react";
import styles from "./AddForm.module.scss";
import { useForm, Controller } from "react-hook-form";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import moment from "moment";
import Button from "../ui/Button";
import SearchUser from "../searchUser/SearchUser";

const AddForm = ({ elements }) => {
	const {
		register,
		formState: { errors },
		handleSubmit,
		control,
	} = useForm();

	const addUserHandler = (arr) => {
		// console.log(arr);
	}

	const submitHandler = data => {
		console.log(data);
	};

	return (
		<Fragment>
			<form onSubmit={handleSubmit(submitHandler)}>
				{elements.input
					? elements.input.map((element, index) => {
							let name = element.name;
							return (
								<div key={index} className={styles["input-box"]}>
									<label>{element.label}</label>
									<input
										{...register(element.name, {
											required: element.required,
											maxLength: element.maxLength,
										})}
									/>
									{errors[name] && (
										<p className={styles["error-msg"]}>Title is required</p>
									)}
								</div>
							);
					  })
					: null}
				{elements.textarea
					? elements.textarea.map((element, index) => {
							return (
								<div key={index} className={styles["input-box"]}>
									<label>{element.label}</label>
									<textarea
										{...register(element.name, {
											required: element.required,
										})}></textarea>
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
					<SearchUser className={styles["input-box"]} addUsers={addUserHandler}/>
				) : null}
				<Button submit className={styles.btn}>
					Add Task
				</Button>
			</form>
			
		</Fragment>
	);
};

export default AddForm;
