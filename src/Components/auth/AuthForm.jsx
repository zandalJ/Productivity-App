import { useCallback, useEffect, useState, Fragment } from "react";
import styles from "./AuthForm.module.scss";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import FormInput from "../forms/FormInput";
import Button from "../ui/Button";
import { regex } from "../../constants/regex";
import { auth } from "../../firebase";
import { registerUser, loginUser } from "../../store/auth-actions";
import anonymousAvatar from "../../img/anonymous-avatar.png";
import { toastify } from "../../constants/toastify";

const AuthForm = () => {
	const location = useLocation();
	const registerPage = location.pathname === "/register";
	const title = registerPage ? "Sign Up" : "Log In";

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [loginError, setLoginError] = useState(null);
	const [registerError, setRegisterError] = useState(null);

	const {
		register,
		setError,
		formState: { errors },
		handleSubmit,
		watch,
	} = useForm();

	useEffect(() => {
		if (registerError !== null) {
			if (registerError === "auth/email-already-in-use") {
				setError("email", {
					type: "auth",
					message: "The email address is already in use by another account.",
				});
			} else if (registerError === "auth/invalid-email") {
				setError("email", {
					type: "auth",
					message: "The email address is not a valid email address.",
				});
			} else if (registerError === "auth/network-request-failed") {
				setError("email", { type: "auth" });
				setError("password", {
					type: "auth",
					message:
						"A network error occurred while trying to reach the Firebase authentication servers.",
				});
			}
		}
	}, [registerError, setError]);

	useEffect(() => {
		if (loginError !== null) {
			if (loginError === "auth/invalid-email") {
				setError("email", { type: "auth", message: "Invalid email." });
			} else if (loginError === "auth/user-disabled") {
				setError("password", {
					type: "auth",
					message: "User account has been disabled.",
				});
			} else if (loginError === "auth/user-not-found") {
				setError("email", {
					type: "auth",
					message: "No user found with this email address.",
				});
				setError("password", { type: "auth" });
			} else if (loginError === "auth/wrong-password") {
				setError("password", {
					type: "auth",
					message: "Incorrect password.",
				});
			} else if (loginError === "auth/too-many-requests") {
				setError("password", {
					type: "auth",
					message:
						"Too many unsuccessful sign-in attempts were made. Try again later.",
				});
				setError("email", { type: "auth" });
			}
		}
	}, [loginError, setError]);

	const submitHandler = useCallback(
		async formData => {
			const authData = {
				name: formData.name || "",
				surname: formData.surname || "",
				nickname: formData.nickname || "",
				email: formData.email,
				password: formData.password,
				returnSecureToken: true,
				teamMembers: [],
				teams: [],
				avatarUrl: anonymousAvatar,
			};
			if (registerPage) {
				try {
					await dispatch(registerUser(authData, auth));
					navigate("/login");
					toastify("Registered successfully");
				} catch (error) {
					setRegisterError(error);
				}
			} else {
				try {
					await dispatch(
						loginUser({
							auth: auth,
							email: authData.email,
							password: authData.password,
						})
					);
					navigate("/");
					toastify("Login successfully");
				} catch (error) {
					setLoginError(error);
				}
			}
		},
		[dispatch, navigate, registerPage]
	);

	const formFooterText = registerPage
		? "Do you have an account? Log in"
		: "You don't have an account? Register";

	return (
		<div className={styles["form-wrapper"]}>
			<form onSubmit={handleSubmit(submitHandler)}>
				<h1>{title}</h1>
				{registerPage && (
					<Fragment>
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
					</Fragment>
				)}
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
					passwordInput
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
						passwordInput
					/>
				)}
				<Link
					to={registerPage ? "/login" : "/register"}
					className={styles["form-text"]}>
					{formFooterText}
				</Link>
				<Button submit className={styles.btn}>
					{title}
				</Button>
			</form>
		</div>
	);
};

export default AuthForm;
