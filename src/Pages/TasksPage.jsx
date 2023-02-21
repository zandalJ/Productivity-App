import Wrapper from "../Components/ui/Wrapper";
import LayoutHeaderWrapper from "../Components/ui/LayoutHeaderWrapper";
import LayoutBottomWrapper from "../Components/ui/LayoutBottomWrapper";
import Tasks from "../Components/tasks/Tasks";
import TasksFilter from "../Components/tasks/TasksFilter";
const TasksPage = () => {
	return (
		<Wrapper>
			<LayoutHeaderWrapper>
				<TasksFilter />
			</LayoutHeaderWrapper>
			<LayoutBottomWrapper>
				<Tasks />
			</LayoutBottomWrapper>
		</Wrapper>
	);
};

export default TasksPage;
