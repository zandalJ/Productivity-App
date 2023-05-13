import styles from "./MembersCell.module.scss";
import Checkbox from "../ui/Checkbox";
import UserPhoto from "../ui/UserPhoto";

const MembersCell = ({ data, className, firstCell }) => {
	return (
		<div className={`${styles.cell} ${className ? className : ""}`}>
			{firstCell ? (
				<div className={styles["first-cell-box"]}>
					<Checkbox />
					<UserPhoto size={25} href={data.photoUrl} />
					<p>{data}</p>
				</div>
			) : (
				<p>{data}</p>
			)}
		</div>
	);
};

export default MembersCell;
