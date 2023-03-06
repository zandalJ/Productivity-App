import { Fragment } from "react";
import RadioButtons from "./RadioButtons";
import Fieldset from "./Fieldset";
const FilterButtons = ({ mobile, desktop }) => {
	return (
		<Fragment>
			{mobile && (
				<Fieldset
					title='Filter by:'
					type='filter'
					options={["All", "Completed", "In Progress"]}
				/>
			)}
			{desktop && (
				<RadioButtons
					options={[
						["All", "all"],
						["Completed", "completed"],
						["In Progress", "progress"],
					]}
					type='filter'
				/>
			)}
		</Fragment>
	);
};

export default FilterButtons;
