import { useState, useEffect } from "react";
import styles from "./Profile.module.scss";
import ProfileSection from "./ProfileSection";
import { useSelector, useDispatch } from "react-redux";
import UserPhoto from "../ui/UserPhoto";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { changeProfileImage } from "../../store/auth-actions";
import { useNavigate } from "react-router-dom";
import InfoBox from "../ui/InfoBox";
import LoadingSpinner from "../ui/LoadingSpinner";

const Profile = () => {
	const [selectedImage, setSelectedImage] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const dispatch = useDispatch();
	const userData = useSelector(state => state.auth.userData);

	const navigate = useNavigate();

	useEffect(() => {
		const changeProfileImageHandler = async () => {
			try {
				setIsLoading(true);
				await dispatch(changeProfileImage(selectedImage));
			} catch (err) {
				console.log(err);
			} finally {
				setIsLoading(false);
			}
		};

		if (selectedImage) {
			changeProfileImageHandler();
		}
	}, [selectedImage, dispatch, navigate]);

	if (isLoading) return <LoadingSpinner />;

	return (
		<div className={styles.box}>
			<ProfileSection title='Your Profile'>
				<div className={styles["profile-header"]}>
					<div className={styles["profile-header__img-box"]}>
						<UserPhoto href={userData.avatarUrl} className={styles.img} uid={userData.uid}/>
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
									onChange={e => setSelectedImage(e.target.files[0])}
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
			<ProfileSection title='Profile Information'>
				<div className={styles["profile-information"]}>
					<InfoBox title='Email' data={userData.email} borderColor='sec' />
					<InfoBox
						title='Name'
						data={`${userData.name} ${userData.surname}`}
						borderColor='sec'
					/>
					<InfoBox title='Created at' data='12.01.2023' borderColor='sec' />
					<InfoBox title='Last login' data='22.01.2023' borderColor='sec' />
				</div>
			</ProfileSection>
		</div>
	);
};

export default Profile;
