import { Fragment } from "react";
import styles from "./SortDropdown.module.scss";
import Fieldset from "./Fieldset";
const SortDropdown = ({ mobile, desktop }) => {
	return (
		<Fragment>
			{mobile && (
				<Fieldset
					title='Sort by'
					options={[
						"Completed Ascending",
						"Completed Descending",
						"Deadline Ascending",
						"Deadline Descending",
					]}
					type='sort'
				/>
			)}
			{desktop && (
				<select name='sort' id='sort' className={styles.select}>
					<option value='completed-asc'>Completed Ascending</option>
					<option value='completed-desc'>Completed Descending</option>
					<option value='completed-asc'>Deadline Ascending</option>
					<option value='completed-asc'>Deadline Descending</option>
				</select>
			)}
		</Fragment>
	);
};

export default SortDropdown;    
