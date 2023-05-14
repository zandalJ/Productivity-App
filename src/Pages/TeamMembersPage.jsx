import styles from "./TeamMembersPage.module.scss";
import Wrapper from "../Components/ui/Wrapper";
import LayoutHeaderWrapper from "../Components/ui/LayoutHeaderWrapper";
import LayoutBottomWrapper from "../Components/ui/LayoutBottomWrapper";
import TeamMembers from "../Components/team-members/TeamMembers";
import useWidth from "./../hooks/useWidth";

const TeamMembersPage = () => {
	const width = useWidth();
	const layoutInlineStyles =
		width >= 768 ? { height: "100%", maxHeight: "100%" } : { height: "auto" };

	return (
		<Wrapper>
			<LayoutHeaderWrapper />
			<LayoutBottomWrapper
				className={styles["bottom-wrapper"]}
				style={layoutInlineStyles}>
				<TeamMembers />
			</LayoutBottomWrapper>
		</Wrapper>
	);
};

export default TeamMembersPage;
