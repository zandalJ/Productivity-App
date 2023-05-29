import styles from "./ProfileSection.module.scss";

const ProfileSection = ({ title, children }) => {
	return (
		<div className={styles.box}>
			<h3 className={styles.title}>{title}</h3>
			{children}
		</div>
	);
};

export default ProfileSection;
