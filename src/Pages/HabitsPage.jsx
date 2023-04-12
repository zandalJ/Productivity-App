import Wrapper from "../Components/ui/Wrapper";
import LayoutHeaderWrapper from "../Components/ui/LayoutHeaderWrapper";
import LayoutBottomWrapper from "../Components/ui/LayoutBottomWrapper";
import DayPicker from "../Components/habits/day-picker/DayPicker";

const HabitsPage = () => {
	return (
		<Wrapper>
			<LayoutHeaderWrapper>
				<DayPicker />
			</LayoutHeaderWrapper>
			<LayoutBottomWrapper></LayoutBottomWrapper>
		</Wrapper>
	);
};

export default HabitsPage;
