import { Fragment } from "react";
import styles from "./FilterButtons.module.scss";
import RadioButtons from "./RadioButtons";
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
			{desktop && (
				<RadioButtons
					options={["All", "Completed", "In Progress"]}
					type='filter'
				/>
			)}
		</Fragment>
	);
};

export default FilterButtons;
