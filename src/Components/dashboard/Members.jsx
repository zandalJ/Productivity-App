import styles from "./Members.module.scss";
import useWidth from "../../hooks/useWidth";
import UserPhoto from "../ui/UserPhoto";

const Members = () => {
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
			<UserPhoto
				href='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
				size={membersPhotoSize}
			/>
			<div className={styles["member__data"]}>
				<p className={styles["member__names"]}>Leila Coleman</p>
				<p className={styles["member__email"]}>leila.coleman@gmail.com</p>
			</div>
		</div>
	);
};

export default Members;
