import styles from "./Dashboard.module.scss";
import Wrapper from "../Components/ui/Wrapper";
import HeadingText from "../Components/ui/HeadingText";
import Card from "../Components/ui/Card";

const DashboardPage = () => {
	return (
		<Wrapper>
			<HeadingText />
			<section className={`center-column-x ${styles.growth}`}>
				<Card className={styles.card}>
					<div className={styles["growth__header-box"]}>
						<p
							className={`${styles["growth__text"]} ${styles["growth__text--purple"]}`}>
							Task Completed
						</p>
						<p className={styles["growth__number-count"]}>18</p>
					</div>
					<p className={styles["growth__description"]}>
						<span className={styles["growth__description--percentage"]}>
							+10%
						</span>
						more from the last week
					</p>
				</Card>
				<Card className={styles.card}>
					<div className={styles["growth__header-box"]}>
						<p
							className={`${styles["growth__text"]} ${styles["growth__text--green"]}`}>
							Tasks Completed
						</p>
						<p className={styles["growth__number-count"]}>07</p>
					</div>
					<p className={styles["growth__description"]}>
						<span className={styles["growth__description--percentage"]}>
							+22%
						</span>
						more from the last week
					</p>
				</Card>
			</section>
		</Wrapper>
	);
};

export default DashboardPage;
