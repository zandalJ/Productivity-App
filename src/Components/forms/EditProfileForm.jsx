import styles from "./EditProfileForm.module.scss";
import { useForm } from "react-hook-form";
import FormInput from "./FormInput";
import Button from "../ui/Button";

const EditProfileForm = ({userData}) => {
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
				title='Your Name'
				name='name'
				register={register}
				defaultValue={userData.name}
				errors={errors}
				type='string'
			/>
			<FormInput
				title='Your Surname'
				name='surname'
				register={register}
				defaultValue={userData.surname}
				errors={errors}
				type='string'
			/>
			<FormInput
				title='Your Nickname'
				name='nickname'
				register={register}
				defaultValue={userData.nickname}
				errors={errors}
				type='string'
			/>
			<Button submit className={styles.btn}>Update Profile</Button>
		</form>
	);
};

export default EditProfileForm;
