import { Fragment } from "react";
import styles from "./Dashboard.module.scss";
import LayoutHeaderWrapper from "../ui/LayoutHeaderWrapper";
import LayoutBottomWrapper from "../ui/LayoutBottomWrapper";
import Card from "../ui/Card";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import GrowthCard from "./GrowthCard";
import Stats from "./Stats";
import Members from "./Members";

const Dashboard = () => {
	return (
		<Fragment>
			<LayoutHeaderWrapper>
				<section className={`${styles.section} ${styles.growth}`}>
					<GrowthCard title='Tasks Completed' color='purple' />
					<GrowthCard title='New Tasks' color='green' />
				</section>
			</LayoutHeaderWrapper>
			<LayoutBottomWrapper>
				<section className={`${styles.stats} ${styles.section}`}>
					<h2 className={styles.subheading}>Tasks & Habits</h2>
					<Stats title='All Tasks' icon={solid("infinity")} color='blue' />
					<Stats title='Completed Tasks' icon={solid("check")} color='purple' />
					<Stats title='New Tasks' icon={solid("square-plus")} color='green' />
					<Stats
						title='Habbits Streak'
						icon={solid("fire-flame-curved")}
						color='blue'
					/>
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
