import { useEffect } from "react";
import styles from "./Task.module.scss";
import Card from "../ui/Card";
import UserPhoto from "../ui/UserPhoto";
import ProgressBar from "../ui/ProgressBar";
import moment from "moment";
import { useDispatch } from "react-redux";
import { changeTaskStatus } from "../../store/tasks-actions";

const Task = ({ data }) => {
	const dispatch = useDispatch()
	
	const timePercentageHandler = () => {
		const deadlineTime = moment(data.deadline);
		const createTime = moment(data.createDate);
		const currentTime = moment();
		const totalDiff = deadlineTime.diff(createTime);
		const timeRemaining = deadlineTime.diff(currentTime);
		const timePassed = totalDiff - timeRemaining;
		const percentage = Math.floor(timePassed / totalDiff *100);
		return percentage;
	};

	const timePercentageLeft = timePercentageHandler();

	useEffect(() => {
		if(timePercentageLeft===100){
			dispatch(changeTaskStatus(data.id))
		}
	}, [timePercentageLeft, data.id, dispatch]);

	return (
		<Card className={styles.card} data-filter-type='progress'>
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
