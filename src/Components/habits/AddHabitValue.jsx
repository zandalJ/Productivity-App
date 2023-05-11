import styles from "./AddHabitValue.module.scss";
import { useForm } from "react-hook-form";
import Button from "../ui/Button";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateHabit } from "../../store/habits-actions";
import moment from "moment";

const AddHabitValue = ({ showModal }) => {
	const dispatch = useDispatch();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const { id } = useParams();
	const habitId = parseInt(id.match(/\d+/)[0]);
	const habits = useSelector(state => state.habits.habits);
	const habit = habits[habitId];

	const submitHandler = async data => {
		const successToFailRatio = (
			(data.habitValue / habit.goal.maxValue) *
			100
		).toFixed(0);
		const currentDate = moment().format("DD-MM-YYYY");

		const goalData = {
			goal: {
				...habit.goal,
				currentValue: data.habitValue,
			},
			days: [
				...habit.days.slice(0, -1),
				{ date: currentDate, ratio: successToFailRatio },
			],
		};
		await dispatch(updateHabit(goalData, id, true));
		showModal();
	};

	return (
		<form onSubmit={handleSubmit(submitHandler)} className={styles.form}>
			<div className={styles["form__input-box"]}>
				<input
					type='number'
					{...register("habitValue", {
						min: parseInt(habit.goal.currentValue),
						max: parseInt(habit.goal.maxValue),
					})}
					placeholder={habit.goal.currentValue}
				/>
				<Button submit className={styles.btn}>
					Update
				</Button>
			</div>
			{errors["habitValue"] && (
				<p>
					Type number beetwen {habit.goal.currentValue} - {habit.goal.maxValue}
				</p>
			)}
		</form>
	);
};

export default AddHabitValue;
