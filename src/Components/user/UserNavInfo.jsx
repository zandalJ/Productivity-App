import styles from "./UserNavInfo.module.scss";
import UserPhoto from "../ui/UserPhoto";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
const UserNavInfo = ({ open, animationVariants, photoSize }) => {
	const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
	const name = isLoggedIn ? "Fabian Dziuba" : "Anonymous";
	const nick = isLoggedIn ? "@Zandal" : "@anonym";
	const photoUrl = isLoggedIn
		? "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
		: "https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_960_720.png";
	return (
		<motion.div
			className={styles.box}
			animate={open ? "open" : "closed"}
			initial={open ? "open" : "closed"}
			variants={animationVariants}>
			<UserPhoto isOwner href={photoUrl} size={photoSize} />
			<div className={styles["names-box"]}>
				<p className={styles.name}>{name}</p>
				<p className={styles.nickname}>{nick}</p>
			</div>
		</motion.div>
	);
};

export default UserNavInfo;