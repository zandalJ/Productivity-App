import styles from "./FormInput.module.scss";
import ErrorMessage from "../ui/ErrorMessage";

const FormInput = ({
	title,
	name,
	type,
	register,
	rules,
	errors,
	wrap,
	defaultValue,
}) => {
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
			<input
				type={type}
				placeholder={title}
				name={name}
				defaultValue={defaultValue}
				aria-invalid={hasError}
				{...(register && register(name, rules))}
			/>
			{errorMessage && <ErrorMessage message={errorMessage} />}
		</div>
	);
};

export default FormInput;
