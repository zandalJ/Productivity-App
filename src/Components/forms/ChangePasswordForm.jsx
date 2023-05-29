import styles from "./ChangePasswordForm.module.scss";
import { useForm } from "react-hook-form";
import FormInput from "./FormInput";
import Button from "../ui/Button";

const ChangePasswordForm = ({ userData }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const submitHandler = data => {
		console.log(data);
	};

	return (
		<form onSubmit={handleSubmit(submitHandler)} className={styles.form}>
			<FormInput
				title='Actual Password'
				name='actual'
				register={register}
				defaultValue=''
				errors={errors}
				type='password'
                passwordInput
			/>
			<FormInput
				title='New Password'
				name='new'
				register={register}
				defaultValue=''
				errors={errors}
				type='password'
                passwordInput
			/>
			<Button submit className={styles.btn}>
				Update Password
			</Button>
		</form>
	);
};

export default ChangePasswordForm;
