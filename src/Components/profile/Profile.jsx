import { Fragment, useState, useEffect } from "react";
import styles from "./Profile.module.scss";
import ProfileSection from "./ProfileSection";
import { useSelector } from "react-redux";
import UserPhoto from "../ui/UserPhoto";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { changeProfileImage } from "../../store/auth-actions";
import { useDispatch } from "react-redux";

const Profile = () => {
	const [selectedImage, setSelectedImage] = useState(null);

	const dispatch = useDispatch();
	const userData = useSelector(state => state.auth.userData);

	const profileImageHandler = e => {
		setSelectedImage(e.target.files[0]);
	};

	useEffect(() => {
		if (selectedImage) {
			dispatch(changeProfileImage(selectedImage));
		}
	}, [selectedImage, dispatch]);

	return (
		<Fragment>
			<ProfileSection title='Your Profile'>
				<div className={styles["profile-header"]}>
					<div className={styles["profile-header__img-box"]}>
						<UserPhoto href={userData.avatarUrl} className={styles.img} />
						<Tooltip title='Change photo' sx={{ fontSize: "2rem" }}>
							<IconButton
								color='primary'
								aria-label='upload picture'
								component='label'
								className={styles["upload-button"]}>
								<input
									hidden
									accept='image/*'
									type='file'
									onChange={profileImageHandler}
								/>
								<FontAwesomeIcon icon={solid("camera")} />
							</IconButton>
						</Tooltip>
					</div>
					<div className={styles["profile-header__info-box"]}>
						<p
							className={
								styles.name
							}>{`${userData.name} ${userData.surname}`}</p>
						<p className={styles.nickname}>{`@${userData.nickname}`}</p>
					</div>
				</div>
			</ProfileSection>
		</Fragment>
	);
};

export default Profile;
