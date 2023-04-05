import { Fragment, useEffect, useState } from "react";
import styles from "./Tasks.module.scss";
import Task from "./Task";
import { ElementsPagination } from "../pagination/Pagination";
import useWidth from "../../hooks/useWidth";
import usePagination from "../../hooks/usePagination";
import { useSelector } from "react-redux";

const Tasks = () => {
	const [displayTasks, setDisplayTasks] = useState([])
	const tasks = useSelector(state => state.tasks.tasks);
	const filter = useSelector(state => state.filterSorting.filter);
	const width = useWidth();

	useEffect(() => {
		if (filter !== "all") {
			const filteredTasks = tasks.filter(task => task.status === filter);
			setDisplayTasks(filteredTasks)
		}else{
			setDisplayTasks(tasks)
		}

	}, [filter, tasks]);

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
		displayTasks
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
