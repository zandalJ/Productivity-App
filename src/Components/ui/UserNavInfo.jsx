import styles from './UserNavInfo.module.scss'
import UserPhoto from './UserPhoto'
import { motion } from "framer-motion";
const UserNavInfo = ({ open, animationVariants }) => {
	return (
		<motion.div
			className={styles.box}
			animate={open ? "open" : "closed"}
			initial={open ? "open" : "closed"}
			variants={animationVariants}>
			<UserPhoto
				isOwner
				href='https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
				size={80}
			/>
			<div className={styles["names-box"]}>
				<p className={styles.name}>Fabian Dziuba</p>
				<p className={styles.nickname}>@Zandal</p>
			</div>
		</motion.div>
	);
};

export default UserNavInfo;