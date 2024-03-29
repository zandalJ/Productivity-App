import { Fragment } from "react";
import styles from "./MembersRow.module.scss";
import MembersCell from "./MembersCell";
import HorizontalLine from "../ui/HorizontalLine";

const MembersRow = ({ userData, headerRow, register }) => {
	const fullName = !headerRow ? `${userData.name} ${userData.surname}` : null;

	const rowData = !headerRow
		? [userData.nickname, fullName, userData.email]
		: ["Nickname", "Name", "Mail"];

	let output = (
		<Fragment>
			<MembersCell
				firstCell={!headerRow ? true : false}
				data={rowData?.username || rowData[0]}
				photoUrl={userData?.avatarUrl}
				userId={userData?.id}
				register={register}
				className={headerRow ? styles["header-cell"] : ""}
			/>
			<MembersCell
				data={fullName || rowData[1]}
				className={headerRow ? styles["header-cell"] : ""}
			/>
			<MembersCell
				data={rowData?.email || rowData[2]}
				className={headerRow ? styles["header-cell"] : ""}
			/>
		</Fragment>
	);

	return (
		<Fragment>
			{headerRow && <HorizontalLine />}
			<div className={styles.row}>{output}</div>
			<HorizontalLine />
		</Fragment>
	);
};

export default MembersRow;
