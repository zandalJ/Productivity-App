import styles from "./UserNavInfo.module.scss";
import UserPhoto from "../ui/UserPhoto";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
const UserNavInfo = ({ open, animationVariants, photoSize }) => {
	const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
	const userData = useSelector(state => state.auth.userData);
	const name =
		isLoggedIn && userData
			? `${userData.name} ${userData.surname}`
			: "Anonymous";
	const nick = isLoggedIn && userData ? `@${userData.nickname}` : "@anonym";
	return (
		<motion.div
			className={styles.box}
			animate={open ? "open" : "closed"}
			initial={open ? "open" : "closed"}
			variants={animationVariants}>
			<UserPhoto
				isOwner
				href={userData.avatarUrl}
				size={photoSize}
				uid={userData.uid}
			/>
			<div className={styles["names-box"]}>
				<p className={styles.name}>{name}</p>
				<p className={styles.nickname}>{nick}</p>
			</div>
		</motion.div>
	);
};

export default UserNavInfo;
