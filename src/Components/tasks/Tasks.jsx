import { Fragment, useEffect, useState } from "react";
import styles from "./Tasks.module.scss";
import Task from "./Task";
import { ElementsPagination } from "../pagination/Pagination";
import useWidth from "../../hooks/useWidth";
import usePagination from "../../hooks/usePagination";
import { useSelector } from "react-redux";
import moment from "moment";

const Tasks = () => {
	const [filteredTasks, setFilteredTasks] = useState([]);
	const [displayedTasks, setDisplayedTasks] = useState([]);
	const tasks = useSelector(state => state.tasks.tasks);
	const filter = useSelector(state => state.filterSorting.filter);
	const sort = useSelector(state => state.filterSorting.sort);
	const width = useWidth();

	useEffect(() => {
		if (tasks.length > 0) {
			if (filter !== "all") {
				const filteredTasks = tasks.filter(task => task.status === filter);
				setFilteredTasks(filteredTasks);
			} else {
				setFilteredTasks(tasks);
			}
		}
	}, [filter, tasks]);

	useEffect(() => {
		if (filteredTasks.length > 0) {
			let sortedElements = [];
			if (sort === "ca") {
				sortedElements = [...filteredTasks].sort((a, b) =>
					moment(b.deadline).diff(moment(a.deadline))
				);
			} else if (sort === "cd") {
				sortedElements = [...filteredTasks].sort((a, b) =>
					moment(a.deadline).diff(moment(b.deadline))
				);
			}
			setDisplayedTasks(sortedElements);
		} else {
			setDisplayedTasks(filteredTasks);
		}
	}, [sort, filteredTasks]);

	let elementsPerPage = 8;
	if (width >= 768) {
		elementsPerPage = 10;
	}
	if (width >= 992) {
		elementsPerPage = 12;
	}
	if (width >= 1400) {
		elementsPerPage = 16;
	}

	const { pageHandler, items, countEl } = usePagination(
		elementsPerPage,
		displayedTasks
	);

	return (
		<div className={styles["tasks-wrapper"]}>
			{tasks.length > 0 ? (
				<Fragment>
					<div className={styles["tasks-box"]}>
						{items.map((item, index) => {
							return <Task key={index} data={item} />;
						})}
					</div>
					<div className={styles["pagination-wrapper"]}>
						<ElementsPagination
							elementsPerPage={countEl}
							onChange={pageHandler}
						/>
					</div>
				</Fragment>
			) : (
				<p className={styles["bottom-text"]}>You have no tasks created.</p>
			)}
		</div>
	);
};

export default Tasks;
