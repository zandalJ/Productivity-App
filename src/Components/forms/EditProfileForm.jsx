import styles from "./EditProfileForm.module.scss";
import { useForm } from "react-hook-form";
import FormInput from "./FormInput";
import Button from "../ui/Button";
import { userAuthDataUpdate } from "../../store/auth-actions";
import { useDispatch } from "react-redux";

const EditProfileForm = ({ userData }) => {
	const dispatch = useDispatch();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const submitHandler = data => {
		dispatch(
			userAuthDataUpdate({
				name: data.name,
				surname: data.surname,
				nickname: data.nickname,
			})
		);
	};

	return (
		<form onSubmit={handleSubmit(submitHandler)} className={styles.form}>
			<FormInput
				title='Your Name'
				name='name'
				register={register}
				rules={{
					required: "Enter your name.",
					minLength: 2,
					maxLength: 15,
				}}
				defaultValue={userData.name}
				errors={errors}
				type='string'
			/>
			<FormInput
				title='Your Surname'
				name='surname'
				register={register}
				rules={{
					required: "Enter your surname.",
					minLength: 2,
					maxLength: 15,
				}}
				defaultValue={userData.surname}
				errors={errors}
				type='string'
			/>
			<FormInput
				title='Your Nickname'
				name='nickname'
				register={register}
				rules={{
					required: "Enter your nickname.",
					minLength: 1,
					maxLength: 20,
				}}
				defaultValue={userData.nickname}
				errors={errors}
				type='string'
			/>
			<Button submit className={styles.btn}>
				Update Profile
			</Button>
		</form>
	);
};

export default EditProfileForm;
