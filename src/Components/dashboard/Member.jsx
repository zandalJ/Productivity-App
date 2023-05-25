import styles from "./Members.module.scss";
import useWidth from "../../hooks/useWidth";
import UserPhoto from "../ui/UserPhoto";

const Member = ({ name, surname, email, avatarUrl }) => {
	const width = useWidth();
	let membersPhotoSize;
	if (width < 576) {
		membersPhotoSize = 35;
	}
	if (width >= 576) {
		membersPhotoSize = 45;
	}
	if (width >= 992) {
		membersPhotoSize = 35;
	}
	if (width > 1050) {
		membersPhotoSize = 55;
	}
	return (
		<div className={styles.member}>
			<UserPhoto href={avatarUrl} size={membersPhotoSize} />
			<div className={styles["member__data"]}>
				<p className={styles["member__names"]}>{`${name} ${surname}`}</p>
				<p className={styles["member__email"]}>{email}</p>
			</div>
		</div>
	);
};

export default Member;
