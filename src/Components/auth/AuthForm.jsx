import { useEffect, useState } from "react";
import styles from "./AuthForm.module.scss";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import FormInput from "../form/FormInput";
import Button from "../ui/Button";
import { regex } from "../../constants/regex";
import { registerUrl, loginUrl } from "../../constants/authApiData";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { collection, doc } from "firebase/firestore";

const AuthForm = () => {
	const location = useLocation();
	const registerPage = location.pathname === "/register";
	const url = registerPage ? registerUrl : loginUrl;
	const title = registerPage ? "Sign Up" : "Log In";

	const {
		register,
		formState: { errors },
		handleSubmit,
		watch,
	} = useForm();

	const submitHandler = async formData => {
		const authData = {
			name: formData.name,
			surname: formData.surname,
			nickname: formData.nickname,
			email: formData.email,
			password: formData.password,
			returnSecureToken: true,
			teamMembers: [],
			teams: [],
		};

		let user;

		try {
			await createUserWithEmailAndPassword(
				auth,
				authData.email,
				authData.password
			).then(userCredential => {
				user = userCredential.user;
				console.log(user);
			});

			console.log("registered");
		} catch (err) {
			console.log(err);
		}

		const userRef = db.collection("users").doc(user.uid);

		userRef
			.set(authData)
			.then(() => {
				console.log("added!");
			})
			.catch(err => {
				console.log(err);
			});
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
