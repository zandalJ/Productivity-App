import { useEffect, useCallback, useState } from "react";
import styles from "./HabitForm.module.scss";
import { useForm } from "react-hook-form";
import FormInput from "./FormInput";
import ColorSelect from "./ColorSelect";
import GoalSelect from "./GoalSelect";
import Button from "../ui/Button";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addHabit, updateHabit } from "../../store/habits-actions";
import moment from "moment/moment";

const HabitForm = ({ showModal, modal, habitData }) => {
	const location = useLocation();
	const { id } = useParams();
	const dispatch = useDispatch();
	const habits = useSelector(state => state.habits.habits);

	const [resetColor, setResetColor] = useState(false);
	const [resetGoal, setResetGoal] = useState(false);
	const {
		register,
		formState: { errors },
		handleSubmit,
		setValue,
		reset,
		control,
	} = useForm();

	const addHabitHandler = data => {
		let lastId;
		habits.length > 0 ? (lastId = habits[habits.length - 1].id) : (lastId = 0);
		const habitId =
			habits.length > 0
				? "habit-" + (parseInt(lastId.match(/\d+/)[0]) + 1)
				: "habit-" + lastId;
		const formData = {
			name: data.habitName,
			color: data.habitColor,
			goal: {
				maxValue: data.goalAmount,
				currentValue: 0,
				unit: data.goalUnit,
				frequency: data.goalFrequency,
			},
			id: habitId,
		};

		dispatch(addHabit(formData));
		showModal();
		resetFormHandler();
	};


	const updateHabitHandler = async data => {
		const habitId = parseInt(id.match(/\d+/)[0]);
		const formData = {
			name: data.habitName,
			color: data.habitColor,
			goal: {
				maxValue: data.goalAmount,
				currentValue: habits[habitId].goal.currentValue,
				unit: data.goalUnit,
				frequency: data.goalFrequency,
			},
		};

		await dispatch(updateHabit(formData, id));
	};

	const resetFormHandler = useCallback(() => {
		setResetColor(before => !before);
		setResetGoal(before => !before);
		reset();
	}, [reset]);

	useEffect(() => {
		if (!modal) resetFormHandler();
		if (modal) {
			setResetColor(false);
			setResetGoal(false);
		}
	}, [modal, resetFormHandler]);

	const submitHandler =
		location.pathname === "/habits" ? addHabitHandler : updateHabitHandler;

	return (
		<form onSubmit={handleSubmit(submitHandler)}>
			<FormInput
				title='Name'
				name='habitName'
				type='text'
				defaultValue={habitData ? habitData.name : ""}
				register={register}
				rules={{
					required: true,
					maxLength: 15,
				}}
				errors={errors}
			/>
			<ColorSelect
				control={control}
				setValue={setValue}
				resetColor={resetColor}
				defaultValue={habitData ? habitData.color : null}
			/>
			<GoalSelect
				register={register}
				rules={habitData ? { min: habitData.goal.currentValue } : null}
				habitData={habitData ? habitData : null}
				errors={errors}
				setValue={setValue}
				resetGoal={resetGoal}
				defaultValue={habitData ? habitData.goal : null}
			/>
			<Button submit className={styles.btn}>
				Submit
			</Button>
		</form>
	);
};

export default HabitForm;
