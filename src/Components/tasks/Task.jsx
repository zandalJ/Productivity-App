import { useEffect, useState, useCallback } from "react";
import styles from "./Task.module.scss";
import Card from "../ui/Card";
import UserPhoto from "../ui/UserPhoto";
import ProgressBar from "../ui/ProgressBar";
import moment from "moment";
import { useDispatch } from "react-redux";
import { updateTask } from "../../store/tasks-actions";
import { useNavigate } from "react-router-dom";

const Task = ({ data }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [timePercentageLeft, setTimePercentageLeft] = useState(0);

	const timePercentageHandler = useCallback(() => {
		const deadlineTime = moment(data.deadline);
		const createTime = moment(data.createDate);
		const currentTime = moment();
		const totalDiff = deadlineTime.diff(createTime);
		const timeRemaining = deadlineTime.diff(currentTime);
		const timePassed = totalDiff - timeRemaining;
		const percentage = Math.floor((timePassed / totalDiff) * 100);
		return percentage;
	}, [data.deadline, data.createDate]);

	useEffect(() => {
		let checkPercentage;
		checkPercentage = timePercentageHandler();
		if (checkPercentage >= 100) {
			setTimePercentageLeft(100);
			dispatch(updateTask({ status: "completed" }, data.id, true));
		} else {
			setTimePercentageLeft(checkPercentage);
		}
	}, [timePercentageHandler, dispatch, data.id]);

	const navigatePageHandler = () => {
		navigate(`/tasks/${data.id}`);
	};

	return (
		<Card
			className={styles.card}
			data-filter-type='progress'
			onClick={navigatePageHandler}>
			<p className={styles["card__title"]} data-filter-type='progress'>
				{data.title}
			</p>
			<p className={styles["card__desc"]}>{data.description}</p>
			<ProgressBar progress={timePercentageLeft} />
			<div className={styles["card__members-box"]}>
				{data.members.length > 0 &&
					data.members.map((member, index) => {
						return (
							<UserPhoto
								href='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
								size='25'
								key={index}
							/>
						);
					})}
			</div>
		</Card>
	);
};

export default Task;
