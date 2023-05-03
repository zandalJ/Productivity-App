import styles from './HabitsPage.module.scss'
import Wrapper from "../Components/ui/Wrapper";
import LayoutHeaderWrapper from "../Components/ui/LayoutHeaderWrapper";
import LayoutBottomWrapper from "../Components/ui/LayoutBottomWrapper";
import Habits from "../Components/habits/Habits";
import useWidth from "../hooks/useWidth";

const HabitsPage = () => {
	const width = useWidth();
	const inlineStyles =
		width < 768 ? {overflowX: 'hidden'} : {overflowX: "auto"}

	return (
		<Wrapper className={styles.wrapper}>
			<LayoutHeaderWrapper />
			<LayoutBottomWrapper style={inlineStyles}>
				<Habits />
			</LayoutBottomWrapper>
		</Wrapper>
	);
};

export default HabitsPage;
