import { Fragment } from "react";
import MembersTable from "./MembersTable";
import { useSelector } from "react-redux";

const DUMMY_DATA = [
	{
		nickname: "zandal",
		name: "Fabian",
		surname: "Dziuba",
		mail: "zandal.zdl@gmail.com",
		photoUrl:
			"https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_960_720.png",
		id: "user-1",
	},
	{
		nickname: "zandal",
		name: "Fabian",
		surname: "Dziuba",
		mail: "zandal.zdl@gmail.com",
		photoUrl:
			"https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_960_720.png",
		id: "user-2",
	},
	{
		nickname: "zandal",
		name: "Fabian",
		surname: "Dziuba",
		mail: "zandal.zdl@gmail.com",
		photoUrl:
			"https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_960_720.png",
		id: "user-3",
	},
	{
		nickname: "zandal",
		name: "Fabian",
		surname: "Dziuba",
		mail: "zandal.zdl@gmail.com",
		photoUrl:
			"https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_960_720.png",
		id: "user-4",
	},
	{
		nickname: "zandal",
		name: "Fabian",
		surname: "Dziuba",
		mail: "zandal.zdl@gmail.com",
		photoUrl:
			"https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_960_720.png",
		id: "user-5",
	},
	{
		nickname: "zandal",
		name: "Fabian",
		surname: "Dziuba",
		mail: "zandal.zdl@gmail.com",
		photoUrl:
			"https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_960_720.png",
		id: "user-6",
	},
	{
		nickname: "zandal",
		name: "Fabian",
		surname: "Dziuba",
		mail: "zandal.zdl@gmail.com",
		photoUrl:
			"https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_960_720.png",
		id: "user-7",
	},
	{
		nickname: "zandal",
		name: "Fabian",
		surname: "Dziuba",
		mail: "zandal.zdl@gmail.com",
		photoUrl:
			"https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_960_720.png",
		id: "user-8",
	},
];

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
