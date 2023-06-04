import styles from "./MembersCell.module.scss";
import Checkbox from "../ui/Checkbox";
import UserPhoto from "../ui/UserPhoto";

const MembersCell = ({
	data,
	className,
	firstCell,
	photoUrl,
	register,
	userId,
}) => {
	return (
		<div className={`${styles.cell} ${className ? className : ""}`}>
			{firstCell ? (
				<div className={styles["first-cell-box"]}>
					<Checkbox register={register} userId={userId} />
					<UserPhoto size={25} href={photoUrl} uid={userId}/>
					<p>{data}</p>
				</div>
			) : (
				<p>{data}</p>
			)}
		</div>
	);
};

export default MembersCell;
