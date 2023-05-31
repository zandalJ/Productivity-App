import { Fragment, useReducer, useEffect, useState } from "react";
import styles from "./Dashboard.module.scss";
import LayoutHeaderWrapper from "../ui/LayoutHeaderWrapper";
import LayoutBottomWrapper from "../ui/LayoutBottomWrapper";
import Card from "../ui/Card";
import GrowthCards from "./GrowthCards";
import StatsBox from "./StatsBox";
import Members from "./Members";
import LoadingSpinner from "../ui/LoadingSpinner";
import { useDispatch } from "react-redux";
import { getTasksHabitsInfo } from "../../store/tasks-actions";

const reducer = (state, action) => {
	switch (action.type) {
		case "cards_loading": {
			return {
				statsLoading: state.statsLoading,
				cardsLoading: action.loading,
			};
		}
		case "stats_loading": {
			return {
				statsLoading: action.loading,
				cardsLoading: state.cardsLoading,
			};
		}
	}
};

const initialTasksObject = {
	taskCompleted: {
		count: 0,
		percentage: 0,
	},
	newTasks: {
		count: 0,
		percentage: 0,
	},
};

const Dashboard = () => {
	const reduxDispatch = useDispatch();

	const [cardsData, setCardsData] = useState(initialTasksObject);
	const [statsData, setStatsData] = useState({});

	const [state, reducerDispatch] = useReducer(reducer, {
		cardsLoading: true,
		statsLoading: true,
	});

	useEffect(() => {
		const getCardsData = async () => {
			reducerDispatch({ type: "cards_loading", loading: true });
			setCardsData(await reduxDispatch(getTasksHabitsInfo()));
			reducerDispatch({ type: "cards_loading", loading: false });
		};

		const getStatsData = async () => {
			reducerDispatch({ type: "stats_loading", loading: true });
			setStatsData(await reduxDispatch(getTasksHabitsInfo()));
			reducerDispatch({ type: "stats_loading", loading: false });
		};

		getCardsData();
		getStatsData();
	}, [reduxDispatch]);

	if (state.cardsLoading && state.statsLoading) return <LoadingSpinner />;

	return (
		<Fragment>
			<LayoutHeaderWrapper>
				<section className={`${styles.section} ${styles.growth}`}>
					<GrowthCards data={cardsData} />
				</section>
			</LayoutHeaderWrapper>
			<LayoutBottomWrapper>
				<section className={`${styles.stats} ${styles.section}`}>
					<h2 className={styles.subheading}>Tasks & Habits</h2>
					<StatsBox data={statsData} />
				</section>
				<section className={`${styles.members} ${styles.section}`}>
					<h2 className={styles.subheading}>Team Members</h2>
					<Card className={styles["members__box"]}>
						<Members />
					</Card>
				</section>
			</LayoutBottomWrapper>
		</Fragment>
	);
};

export default Dashboard;
