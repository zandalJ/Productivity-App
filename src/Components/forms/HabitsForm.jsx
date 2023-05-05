import { useForm } from "react-hook-form";
import FormInput from "./FormInput";
import ColorSelect from "./ColorSelect";

const HabitsForm = ({ addForm }) => {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const submitHandler = data => {};

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
			<ColorSelect />
		</form>
	);
};

export default HabitsForm;
