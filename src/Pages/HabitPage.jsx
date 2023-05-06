import styles from './HabitPage.module.scss'
import Wrapper from "../Components/ui/Wrapper";
import HabitDetail from "../Components/habits/HabitDetail";

const HabitPage = () => {
	return (
		<Wrapper className={styles.wrapper}>
			<HabitDetail />
		</Wrapper>
	);
};

export default HabitPage;
