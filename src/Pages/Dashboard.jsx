import styles from "./Dashboard.module.scss";
import Wrapper from "../Components/ui/Wrapper";
import HeadingText from "../Components/ui/HeadingText";
import Card from "../Components/ui/Card";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import GrowthCard from "../Components/dashboard/GrowthCard";
import Stats from "../Components/dashboard/Stats";
import Members from "../Components/dashboard/Members";

const DashboardPage = () => {
	return (
		<Wrapper>
			<HeadingText />
			<section className={`${styles.section} ${styles.growth}`}>
				<GrowthCard title='Tasks Completed' color='purple' />
				<GrowthCard title='New Tasks' color='green' />
			</section>
			<div className={styles["section-bottom-wrapper"]}>
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
						<Members/>
						<Members/>
						<Members/>
						<Members/>
						<Members/>
						<Members/>
						<Members/>
					</Card>
				</section>
			</div>
		</Wrapper>
	);
};

export default DashboardPage;
