import { Fragment } from "react";
import Fieldset from "./Fieldset";
import SortingSelect from "./SortingSelect";
const SortDropdown = ({ mobile, desktop }) => {
	return (
		<Fragment>
			{mobile && (
				<Fieldset
					title='Sort by'
					options={[
						["Completed Ascending", "ca"],
						["Completed Descending", "cd"],
						["Deadline Ascending", "da"],
						["Deadline Descending", "dd"],
					]}
					type='sort'
					sort
				/>
			)}
			{desktop && <SortingSelect />}
		</Fragment>
	);
};
export default SortDropdown;
