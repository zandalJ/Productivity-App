import { Fragment } from "react";
import styles from "./MembersRow.module.scss";
import MembersCell from "./MembersCell";
import HorizontalLine from "../ui/HorizontalLine";
import Checkbox from "../ui/Checkbox";

const MembersRow = ({ userData, headerRow }) => {
	const fullName = !headerRow ? `${userData.name} ${userData.surname}` : null;

	const rowData = !headerRow
		? [userData.nickname, fullName, userData.mail]
		: ["Nickname", "Name", "Mail"];

	let output = (
		<Fragment>
			<MembersCell
				firstCell={!headerRow ? true : false}
				data={rowData?.username || rowData[0]}
				className={headerRow ? styles["header-cell"] : ""}
			/>
			<MembersCell
				data={fullName || rowData[1]}
				className={headerRow ? styles["header-cell"] : ""}
			/>
			<MembersCell
				data={rowData?.mail || rowData[2]}
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
