import styles from "./MembersTable.module.scss";
import Checkbox from "../ui/Checkbox";
import HorizontalLine from "../ui/HorizontalLine";
import MembersRow from "./MembersRow";

const MembersTable = ({ members }) => {
	return (
		<div className={styles.table}>
			<MembersRow headerRow />
			<div className={styles["select-all-box"]}>
				<Checkbox />
				<p>Select all</p>
			</div>
			<HorizontalLine />
			{members.map((member, index) => {
				return <MembersRow userData={member} headerRow={false} key={index} />;
			})}
		</div>
	);
};

export default MembersTable;
