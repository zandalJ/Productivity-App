import { Fragment } from "react";
import styles from "./FilterButtons.module.scss";
import Button from "./Button";
import Fieldset from "./Fieldset";
const FilterButtons = ({ mobile, desktop }) => {
	return (
		<Fragment>
			{mobile && (
				<Fieldset
					title='Filter by:'
					options={["All", "Completed", "In Progress"]}
					type='filter'
				/>
			)}
		</Fragment>
	);
};

export default FilterButtons;
