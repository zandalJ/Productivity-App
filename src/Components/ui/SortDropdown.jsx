import { Fragment } from "react";
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
		</Fragment>
	);
};

export default SortDropdown;
