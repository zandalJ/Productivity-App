import { Fragment } from "react";
import GrowthCard from "./GrowthCard";

const GrowthCards = ({ data }) => {
	return (
		<Fragment>
			<GrowthCard
				title='Tasks Completed'
				color='purple'
				data={data.taskCompleted}
			/>
			<GrowthCard title='New Tasks' color='green' data={data.newTasks} />
		</Fragment>
	);
};

export default GrowthCards;
