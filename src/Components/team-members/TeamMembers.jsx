import { Fragment } from "react";
import MembersTable from "./MembersTable";
import { useSelector } from "react-redux";
import LoadingSpinner from "../ui/LoadingSpinner";

const TeamMembers = () => {
	const teamMembers = useSelector(state => state.auth.userData).teamMembers;
	return (
		<Fragment>
			{teamMembers ? (
				<MembersTable members={teamMembers} />
			) : (
				<LoadingSpinner />
			)}
		</Fragment>
	);
};

export default TeamMembers;
