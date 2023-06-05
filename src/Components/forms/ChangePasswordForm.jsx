import { useState } from "react";
import styles from "./ChangePasswordForm.module.scss";
import { useForm } from "react-hook-form";
import FormInput from "./FormInput";
import Button from "../ui/Button";
import { userAuthDataUpdate } from "../../store/auth-actions";
import { useDispatch } from "react-redux";
import { toastify } from "../../constants/toastify";
import { updateDoc } from "firebase/firestore";
import LoadingSpinner from "../ui/LoadingSpinner";
import { fetchUserData } from "../../store/auth-actions";

const ChangePasswordForm = ({ userData }) => {
	const dispatch = useDispatch();

	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		setError,
		reset,
		formState: { errors },
	} = useForm();

	const submitHandler = async data => {
		setIsLoading(true);
		const loginState = JSON.parse(localStorage.getItem("isLoggedIn"));
		await dispatch(userAuthDataUpdate({ password: data.newPassword }, true))
			.then(async ref => {
				await updateDoc(ref, {
					password: data.newPassword,
				});
				await dispatch(fetchUserData(loginState));
				setIsLoading(false);
				reset();
				toastify("Password updated");
			})
			.catch(error => {
				setIsLoading(false);
				setError("currentPassword", { message: error });
			});
	};

	if (isLoading) return <LoadingSpinner />;

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
