import { Fragment } from "react";
import styles from "./ProfileSection.module.scss";

const ProfileSection = ({ title, children }) => {
	return (
		<Fragment>
			<h3 className={styles.title}>{title}</h3>
			{children}
		</Fragment>
	);
};

export default ProfileSection;
