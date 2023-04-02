import { useState } from "react";
import styles from "./Tasks.module.scss";
import Task from "./Task";
import { ElementsPagination } from "../pagination/Pagination";
import useWidth from "../../hooks/useWidth";

const tasks = [
	"task",
	"task",
	"task",
	"task",
	"task",
	"task",
	"task",
	"task",
	"task",
	"task",
	"task",
	"task",
	"task",
	"task",
	"task",
	"task",
	"task",
	"task",
	"task",
	"task",
	"task",
	"task",
	"task",
	"task",
];

const Tasks = () => {
	const width = useWidth();
	const [page, setPage] = useState(1);

	let elementsPerPage = 8;
	if (width >= 768) {
		elementsPerPage = 10;
	} else if (width >= 992) {
		elementsPerPage = 12;
	} else if (width >= 1400) {
		elementsPerPage = 16;
	}

	const pageHandler = (e, p) => {
		setPage(p);
	};

	const startIndex = (page - 1) * elementsPerPage;
	const endIndex = startIndex + elementsPerPage;
	const displayedItems = tasks.slice(startIndex, endIndex);
	const count = Math.ceil(tasks.length / elementsPerPage);
	return (
		<div className={styles['tasks-wrapper']}>
			<div className={styles["tasks-box"]}>
				{displayedItems.map((item, index) => {
					return <Task key={index}/>;
				})}
			</div>
			<div className={styles['pagination-wrapper']}>
				<ElementsPagination elementsPerPage={count} onChange={pageHandler} />
			</div>
		</div>
	);
};

export default Tasks;
