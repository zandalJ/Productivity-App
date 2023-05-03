import styles from "./HabitsPage.module.scss";
import Wrapper from "../Components/ui/Wrapper";
import LayoutHeaderWrapper from "../Components/ui/LayoutHeaderWrapper";
import LayoutBottomWrapper from "../Components/ui/LayoutBottomWrapper";
import Habits from "../Components/habits/Habits";
import HabitsChart from "../Components/habits/HabitsChart";
import useWidth from "../hooks/useWidth";

const HabitsPage = () => {
	const width = useWidth();
	const inlineStyles =
		width < 768 ? { overflowX: "hidden" } : { overflowX: "auto" };

	return (
		<Wrapper className={styles.wrapper}>
			<LayoutHeaderWrapper />
			<LayoutBottomWrapper>
				<div className={styles["content-wrapper"]}>
					<div className={styles["habits-wrapper"]}>
						<Habits />
					</div>
					<HabitsChart />
				</div>
			</LayoutBottomWrapper>
		</Wrapper>
	);
};

export default HabitsPage;
