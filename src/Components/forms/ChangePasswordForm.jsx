import styles from "./ChangePasswordForm.module.scss";
import { useForm } from "react-hook-form";
import FormInput from "./FormInput";
import Button from "../ui/Button";
import { userAuthDataUpdate } from "../../store/auth-actions";
import { useDispatch } from "react-redux";

const ChangePasswordForm = ({ userData }) => {
	const dispatch = useDispatch();

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm();

	const submitHandler = async data => {
		await dispatch(
			userAuthDataUpdate({ password: data.newPassword }, true)
		).catch(error => {
			setError("currentPassword", { message: error });
		});
	};

	return (
		<form onSubmit={handleSubmit(submitHandler)} className={styles.form}>
			<FormInput
				title='Actual Password'
				name='currentPassword'
				register={register}
				rules={{
					required: "Enter your password.",
					minLength: 8,
					maxLength: 25,
					validate: value =>
						value === userData.password || "Incorrect password",
				}}
				defaultValue=''
				errors={errors}
				type='password'
				passwordInput
			/>
			<FormInput
				title='New Password'
				name='newPassword'
				register={register}
				rules={{
					required: "Enter new password.",
					minLength: 8,
					maxLength: 25,
					validate: value =>
						value !== userData.password || "Passwords must be different",
				}}
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
