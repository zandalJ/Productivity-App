import styles from "./AuthForm.module.scss";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import FormInput from "../form/FormInput";
import Button from "../ui/Button";
import { regex } from "../../constants/regex";

const AuthForm = () => {
	const location = useLocation();
	const registerPage = location.pathname === "/register";
	const title = registerPage ? "Sign Up" : "Log In";

	const {
		register,
		formState: { errors },
		handleSubmit,
		watch,
	} = useForm();

	const submitHandler = data => {
		console.log("submited!");
		console.log(data);
	};

	return (
		<div className={styles["form-wrapper"]}>
			<form onSubmit={handleSubmit(submitHandler)}>
				<h1>{title}</h1>
				{registerPage && (
					<div className={styles["inputs-wrapper"]}>
						<FormInput
							title='First Name'
							name='name'
							type='text'
							register={register}
							rules={{
								required: "Enter your first name.",
								minLength: 2,
								maxLength: 15,
							}}
							errors={errors}
							wrap
						/>
						<FormInput
							title='Last Name'
							name='surname'
							type='text'
							register={register}
							rules={{
								required: "Enter your last name.",
								minLength: 2,
								maxLength: 15,
							}}
							errors={errors}
							wrap
						/>
					</div>
				)}
				<FormInput
					title='Nickname'
					name='nickname'
					type='text'
					register={register}
					rules={{
						required: "Enter your nickname.",
						minLength: 1,
						maxLength: 20,
					}}
					errors={errors}
				/>
				<FormInput
					title='Email'
					name='email'
					type='email'
					register={register}
					rules={{
						required: "Enter your email address.",
						pattern: regex,
					}}
					errors={errors}
				/>
				<FormInput
					title='Password'
					name='password'
					type='password'
					register={register}
					rules={{
						required: "Enter your password.",
						minLength: 8,
						maxLength: 25,
					}}
					errors={errors}
				/>
				{registerPage && (
					<FormInput
						title='Confirm Password'
						name='confirm-password'
						type='password'
						register={register}
						rules={{
							required: "Confirm your password.",
							validate: val => {
								if (watch("password") !== val) {
									return "Passwords do no match";
								}
							},
						}}
						errors={errors}
					/>
				)}
				<Button submit className={styles.btn}>
					{title}
				</Button>
			</form>
		</div>
	);
};

export default AuthForm;
