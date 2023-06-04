import { Fragment } from "react";
import Member from "./Member";
import { useSelector } from "react-redux";
import NoDataInfo from "../ui/NoDataInfo";

const Members = () => {
	const teamMembers = useSelector(state => state.auth.userData.teamMembers);

	return (
		<Fragment>
			{teamMembers && teamMembers.length > 0 ? (
				teamMembers.map(member => {
					return (
						<Member
							key={member.id}
							name={member.name}
							surname={member.surname}
							avatarUrl={member.avatarUrl}
							email={member.email}
							uid={member.id}
						/>
					);
				})
			) : (
				<NoDataInfo message='You have no team members' />
			)}
		</Fragment>
	);
};

export default Members;
