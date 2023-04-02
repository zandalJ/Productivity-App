import styles from "./Tasks.module.scss";
import Task from "./Task";
import { ElementsPagination } from "../pagination/Pagination";
import useWidth from "../../hooks/useWidth";
import usePagination from "../../hooks/usePagination";

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
	'tad'
];

const Tasks = () => {
	const width = useWidth();

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

	const {pageHandler, items, countEl} = usePagination(elementsPerPage, tasks)

	return (
		<div className={styles["tasks-wrapper"]}>
			<div className={styles["tasks-box"]}>
				{items.map((item, index) => {
					return <Task key={index} />;
				})}
			</div>
			<div className={styles["pagination-wrapper"]}>
				<ElementsPagination elementsPerPage={countEl} onChange={pageHandler} />
			</div>
		</div>
	);
};

export default Tasks;
