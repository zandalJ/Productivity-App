import styles from "./Pagination.module.scss";
import Pagination from "@mui/material/Pagination";
export const ElementsPagination = ({ elementsPerPage, onChange }) => {

	return (
		<div className={styles["pagination-wrapper"]}>
			<Pagination
				count={elementsPerPage}
				onChange={onChange}
				variant='outlined'
				shape="rounded"
			/>
		</div>
	);
};
