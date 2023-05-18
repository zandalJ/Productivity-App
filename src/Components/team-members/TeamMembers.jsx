import { Fragment } from "react";
import MembersTable from "./MembersTable";
import { useSelector } from "react-redux";

const TeamMembers = () => {
	const teamMembers = useSelector(state => state.auth.userData).teamMembers;

	return (
		<Fragment>
			{teamMembers && (
				<MembersTable members={teamMembers} />
			)}
		</Fragment>
	);
};

export default TeamMembers;
