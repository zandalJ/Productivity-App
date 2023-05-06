import { useEffect, useCallback, useState } from "react";
import styles from "./HabitForm.module.scss";
import { useForm } from "react-hook-form";
import FormInput from "./FormInput";
import ColorSelect from "./ColorSelect";
import GoalSelect from "./GoalSelect";
import Button from "../ui/Button";

const HabitForm = ({ showModal, modal }) => {
	const [resetColor, setResetColor] = useState(false)

	const {
		register,
		formState: { errors },
		handleSubmit,
		setValue,
		reset
	} = useForm();

	const submitHandler = data => {
		console.log(data);
	};

	const resetFormHandler = useCallback(() => {
		setResetColor(before => !before)
		reset()
	}, [reset])

	useEffect(() => {
		if(!modal) resetFormHandler()
	}, [modal, resetFormHandler])

	return (
		<form onSubmit={handleSubmit(submitHandler)}>
			<FormInput
				title='Name'
				name='habitName'
				type='text'
				defaultValue=''
				register={register}
				rules={{
					required: true,
					maxLength: 15,
				}}
				errors={errors}
			/>
			<ColorSelect register={register} setValue={setValue} resetColor={resetColor}/>
			<GoalSelect register={register} setValue={setValue} />
			<Button submit className={styles.btn}>
				Submit
			</Button>
		</form>
	);
};

export default HabitForm;
