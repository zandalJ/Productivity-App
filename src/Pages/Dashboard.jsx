import styles from "./Dashboard.module.scss";
import Wrapper from "../Components/ui/Wrapper";
import HeadingText from "../Components/ui/HeadingText";
import Card from "../Components/ui/Card";
import UserPhoto from "../Components/ui/UserPhoto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import useWidth from "../hooks/useWidth";

const DashboardPage = () => {
	const width = useWidth();
	let membersPhotoSize;
	if (width < 576) {
		membersPhotoSize = 35;
	}
	if (width >= 576) {
		membersPhotoSize = 45;
	}
	if (width >= 992) {
		membersPhotoSize = 35;
	}
	if (width > 1050) {
		membersPhotoSize = 55;
	}

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
			<div className={styles["section-bottom-wrapper"]}>
				<section className={`${styles.stats} ${styles.section}`}>
					<h2 className={styles.subheading}>Tasks & Habits</h2>
					<Card className={`${styles["stats__box"]} ${styles["card-box"]}`}>
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
					<Card className={`${styles["stats__box"]} ${styles["card-box"]}`}>
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
					<Card className={`${styles["stats__box"]} ${styles["card-box"]}`}>
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
					<Card className={`${styles["stats__box"]} ${styles["card-box"]}`}>
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
				<section className={`${styles.members} ${styles.section}`}>
					<h2 className={styles.subheading}>Team Members</h2>
					<Card className={`${styles["members__box"]} ${styles["card-box"]}`}>
						<div className={styles["members__member"]}>
							<UserPhoto
								href='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
								size={membersPhotoSize}
							/>
							<div className={styles["members__member__data"]}>
								<p className={styles["members__member__names"]}>
									Leila Coleman
								</p>
								<p className={styles["members__member__email"]}>
									leila.coleman@gmail.com
								</p>
							</div>
						</div>
						<div className={styles["members__member"]}>
							<UserPhoto
								href='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
								size={membersPhotoSize}
							/>
							<div className={styles["members__member__data"]}>
								<p className={styles["members__member__names"]}>
									Leila Coleman
								</p>
								<p className={styles["members__member__email"]}>
									leila.coleman@gmail.com
								</p>
							</div>
						</div>
						<div className={styles["members__member"]}>
							<UserPhoto
								href='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
								size={membersPhotoSize}
							/>
							<div className={styles["members__member__data"]}>
								<p className={styles["members__member__names"]}>
									Leila Coleman
								</p>
								<p className={styles["members__member__email"]}>
									leila.coleman@gmail.com
								</p>
							</div>
						</div>
						<div className={styles["members__member"]}>
							<UserPhoto
								href='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
								size={membersPhotoSize}
							/>
							<div className={styles["members__member__data"]}>
								<p className={styles["members__member__names"]}>
									Leila Coleman
								</p>
								<p className={styles["members__member__email"]}>
									leila.coleman@gmail.com
								</p>
							</div>
						</div>
						<div className={styles["members__member"]}>
							<UserPhoto
								href='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
								size={membersPhotoSize}
							/>
							<div className={styles["members__member__data"]}>
								<p className={styles["members__member__names"]}>
									Leila Coleman
								</p>
								<p className={styles["members__member__email"]}>
									leila.coleman@gmail.com
								</p>
							</div>
						</div>
						<div className={styles["members__member"]}>
							<UserPhoto
								href='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
								size={membersPhotoSize}
							/>
							<div className={styles["members__member__data"]}>
								<p className={styles["members__member__names"]}>
									Leila Coleman
								</p>
								<p className={styles["members__member__email"]}>
									leila.coleman@gmail.com
								</p>
							</div>
						</div>
						<div className={styles["members__member"]}>
							<UserPhoto
								href='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
								size={membersPhotoSize}
							/>
							<div className={styles["members__member__data"]}>
								<p className={styles["members__member__names"]}>
									Leila Coleman
								</p>
								<p className={styles["members__member__email"]}>
									leila.coleman@gmail.com
								</p>
							</div>
						</div>
					</Card>
				</section>
			</div>
		</Wrapper>
	);
};

export default DashboardPage;
