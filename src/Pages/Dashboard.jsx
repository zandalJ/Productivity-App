import styles from "./Dashboard.module.scss";
import Wrapper from "../Components/ui/Wrapper";
import HeadingText from "../Components/ui/HeadingText";
import Card from "../Components/ui/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const DashboardPage = () => {
	return (
		<Wrapper>
			<HeadingText />
			<section className={`${styles.section} ${styles.growth}`}>
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
							New Tasks
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
			<section className={`${styles.stats} ${styles.section}`}>
				<h2>Tasks & Habits</h2>
				<Card className={styles["stats__box"]}>
					<div className={styles["stats__box--text"]}>
						<FontAwesomeIcon
							icon={solid("infinity")}
							className={styles["stats__icon"]}
						/>
						<p>All Tasks</p>
					</div>
					<p
						className={`${styles["stats__box--number"]} ${styles["stats__box--number--blue"]}`}>
						130
					</p>
				</Card>
				<Card className={styles["stats__box"]}>
					<div className={styles["stats__box--text"]}>
						<FontAwesomeIcon
							icon={solid("check")}
							className={styles["stats__icon"]}
						/>
						<p>Completed Tasks</p>
					</div>
					<p
						className={`${styles["stats__box--number"]} ${styles["stats__box--number--purple"]}`}>
						20
					</p>
				</Card>
				<Card className={styles["stats__box"]}>
					<div className={styles["stats__box--text"]}>
						<FontAwesomeIcon
							icon={solid("square-plus")}
							className={styles["stats__icon"]}
						/>
						<p>New Tasks</p>
					</div>
					<p
						className={`${styles["stats__box--number"]} ${styles["stats__box--number--green"]}`}>
						7
					</p>
				</Card>
				<Card className={styles["stats__box"]}>
					<div className={styles["stats__box--text"]}>
						<FontAwesomeIcon
							icon={solid("fire-flame-curved")}
							className={styles["stats__icon"]}
						/>
						<p>Habbits Streak</p>
					</div>
					<p
						className={`${styles["stats__box--number"]} ${styles["stats__box--number--blue"]}`}>
						4
					</p>
				</Card>
			</section>
		</Wrapper>
	);
};

export default DashboardPage;
