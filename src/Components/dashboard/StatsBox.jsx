import { Fragment } from "react";
import Stats from "./Stats";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const StatsBox = ({ data }) => {
	return (
		<Fragment>
			<Stats
				title='All Tasks'
				icon={solid("infinity")}
				color='blue'
				data={data.allTasks}
			/>
			<Stats
				title='Completed Tasks'
				icon={solid("check")}
				color='purple'
				data={data.allCompletedTasks}
			/>
			<Stats
				title='New Tasks'
				icon={solid("square-plus")}
				color='green'
				data={data.newTasks}
			/>
			<Stats
				title='Habbits Streak'
				icon={solid("fire-flame-curved")}
				color='blue'
			/>
		</Fragment>
	);
};

export default StatsBox;
