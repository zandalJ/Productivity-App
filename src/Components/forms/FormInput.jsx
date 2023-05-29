import { useState, Fragment } from "react";
import styles from "./FormInput.module.scss";
import ErrorMessage from "../ui/ErrorMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const FormInput = ({
	title,
	name,
	type,
	register,
	rules,
	errors,
	wrap,
	defaultValue,
	passwordInput = false,
}) => {
	const [showPassword, setShowPassword] = useState(false);
	const inputType = !showPassword ? "password" : "string";

	const hasError = errors[name];
	let errorMessage;
	if (hasError) {
		if (hasError.message !== "") {
			errorMessage = hasError.message;
		} else {
			if (hasError.type === "minLength") {
				errorMessage = "Your input is too short.";
			} else if (hasError.type === "maxLength") {
				errorMessage = "Your input is too long.";
			} else if (hasError.type === "pattern") {
				errorMessage = "Invalid email.";
			} else if (hasError.type === "required") {
				errorMessage = "Required input.";
			}
		}
	}
	return (
		<div
			className={`${styles["input-box"]} ${
				hasError ? styles["input-box--error"] : ""
			} ${wrap ? styles["input-box--wrap"] : ""}`}>
			<label>{title}</label>
			<div className={styles["icon-box"]}>
				<input
					type={passwordInput ? inputType : type}
					placeholder={title}
					name={name}
					defaultValue={defaultValue}
					aria-invalid={hasError}
					{...(register && register(name, rules))}
				/>
				{passwordInput && (
					<Fragment>
						{showPassword ? (
							<FontAwesomeIcon
								icon={solid("eye-slash")}
								onClick={() => setShowPassword(before => !before)}
							/>
						) : (
							<FontAwesomeIcon
								icon={solid("eye")}
								onClick={() => setShowPassword(before => !before)}
							/>
						)}
					</Fragment>
				)}
			</div>

			{errorMessage && <ErrorMessage message={errorMessage} />}
		</div>
	);
};

export default FormInput;
