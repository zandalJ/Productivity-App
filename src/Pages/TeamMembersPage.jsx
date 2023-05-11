import styles from "./TeamMembersPage.module.scss";
import Wrapper from "../Components/ui/Wrapper";
import LayoutHeaderWrapper from "../Components/ui/LayoutHeaderWrapper";
import LayoutBottomWrapper from "../Components/ui/LayoutBottomWrapper";
import TeamMembers from "../Components/team-members/TeamMembers";

const TeamMembersPage = () => {
	return (
		<Wrapper>
			<LayoutHeaderWrapper />
			<LayoutBottomWrapper className={styles["bottom-wrapper"]}>
				<TeamMembers />
			</LayoutBottomWrapper>
		</Wrapper>
	);
};

export default TeamMembersPage;
