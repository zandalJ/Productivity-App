import styles from "./HabitsForm.module.scss";
import { useForm } from "react-hook-form";
import FormInput from "./FormInput";
import ColorSelect from "./ColorSelect";
import GoalSelect from "./GoalSelect";
import Button from "../ui/Button";

const HabitsForm = ({ addForm }) => {
	const {
		register,
		formState: { errors },
		handleSubmit,
		setValue,
	} = useForm();

	const submitHandler = data => {
		console.log(data);
	};

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
			<ColorSelect register={register} setValue={setValue} />
			<GoalSelect register={register} setValue={setValue} />
			<Button submit className={styles.btn}>
				Submit
			</Button>
		</form>
	);
};

export default HabitsForm;
