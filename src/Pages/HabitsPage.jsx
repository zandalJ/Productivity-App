import Wrapper from "../Components/ui/Wrapper";
import LayoutHeaderWrapper from "../Components/ui/LayoutHeaderWrapper";
import LayoutBottomWrapper from "../Components/ui/LayoutBottomWrapper";
import Habits from "../Components/habits/Habits";

const HabitsPage = () => {
	return (
		<Wrapper>
			<LayoutHeaderWrapper />
			<LayoutBottomWrapper>
				<Habits />
			</LayoutBottomWrapper>
		</Wrapper>
	);
};

export default HabitsPage;
