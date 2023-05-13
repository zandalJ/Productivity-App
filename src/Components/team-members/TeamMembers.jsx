import { Fragment } from "react";
import styles from "./TeamMembers.module.scss";
import MembersTable from "./MembersTable";
import Button from "../ui/Button";

const DUMMY_DATA = [
	{
		nickname: "zandal",
		name: "Fabian",
		surname: "Dziuba",
		mail: "zandal.zdl@gmail.com",
		photoUrl:
			"https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_960_720.png",
	},
	{
		nickname: "zandal",
		name: "Fabian",
		surname: "Dziuba",
		mail: "zandal.zdl@gmail.com",
		photoUrl:
			"https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_960_720.png",
	},
	{
		nickname: "zandal",
		name: "Fabian",
		surname: "Dziuba",
		mail: "zandal.zdl@gmail.com",
		photoUrl:
			"https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_960_720.png",
	},
	{
		nickname: "zandal",
		name: "Fabian",
		surname: "Dziuba",
		mail: "zandal.zdl@gmail.com",
		photoUrl:
			"https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_960_720.png",
	},
	{
		nickname: "zandal",
		name: "Fabian",
		surname: "Dziuba",
		mail: "zandal.zdl@gmail.com",
		photoUrl:
			"https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_960_720.png",
	},
	{
		nickname: "zandal",
		name: "Fabian",
		surname: "Dziuba",
		mail: "zandal.zdl@gmail.com",
		photoUrl:
			"https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_960_720.png",
	},
	{
		nickname: "zandal",
		name: "Fabian",
		surname: "Dziuba",
		mail: "zandal.zdl@gmail.com",
		photoUrl:
			"https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_960_720.png",
	},
	{
		nickname: "zandal",
		name: "Fabian",
		surname: "Dziuba",
		mail: "zandal.zdl@gmail.com",
		photoUrl:
			"https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_960_720.png",
	},
];

const TeamMembers = () => {
	return (
		<Fragment>
			<MembersTable members={DUMMY_DATA} />
			{/* <Button className={styles.btn}>Kick</Button> */}
		</Fragment>
	);
};

export default TeamMembers;
