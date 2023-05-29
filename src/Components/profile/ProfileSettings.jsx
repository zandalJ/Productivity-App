import { useState } from "react";
import styles from "./ProfileSettings.module.scss";
import ProfileSection from "./ProfileSection";
import BorderButton from "../ui/BorderButton";
import Button from "../ui/Button";
import { motion } from "framer-motion";
import ChangePasswordForm from "../forms/ChangePasswordForm";
import EditProfileForm from "../forms/EditProfileForm";
import { useSelector } from "react-redux";

const variants = {
	left: {
		left: 0,
	},
	right: {
		left: "50%",
	},
};

const ProfileSettings = () => {
	const [activeBtnPosition, setActiveBtnPosition] = useState(true);

	const userData = useSelector(state => state.auth.userData);

	return (
		<div className={styles.box}>
			<ProfileSection title='Profile Settings'>
				<div className={styles["profile-settings"]}>
					<div className={styles["profile-settings__buttons"]}>
						<motion.div
							className={styles["profile-settings__buttons--border"]}
							variants={variants}
							animate={activeBtnPosition ? "left" : "right"}
							transition={{ ease: "linear", duration: 0.3 }}
						/>
						<BorderButton
							className={styles["profile-settings__button"]}
							onClick={() => setActiveBtnPosition(before => !before)}>
							Change Password
						</BorderButton>
						<BorderButton
							className={styles["profile-settings__button"]}
							onClick={() => setActiveBtnPosition(before => !before)}>
							Edit Profile
						</BorderButton>
					</div>
					{activeBtnPosition ? (
						<ChangePasswordForm userData={userData} />
					) : (
						<EditProfileForm userData={userData} />
					)}
				</div>
			</ProfileSection>
			<ProfileSection title='Account Management'>
				<div className={styles["account-management"]}>
					<BorderButton className={styles.btn}>Delete Account</BorderButton>
					<Button>Logout</Button>
				</div>
			</ProfileSection>
		</div>
	);
};

export default ProfileSettings;
