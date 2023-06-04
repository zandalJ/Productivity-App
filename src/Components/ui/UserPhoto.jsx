import { useState, useCallback, useEffect } from "react";
import styles from "./UserPhoto.module.scss";
import { getStorage, getDownloadURL, ref } from "firebase/storage";

const UserPhoto = ({ href, size, className, uid, dataComponent = false }) => {
	const [avatarUrl, setAvatarUrl] = useState("");

	const getUserAvatar = useCallback(async () => {
		const storage = getStorage();
		try {
			return await getDownloadURL(ref(storage, `users/${uid}/avatarUrl`));
		} catch (err) {
			console.log(err);
		}
	}, [uid]);

	useEffect(() => {
		const fetchUserAvatar = async () => {
			setAvatarUrl(await getUserAvatar());
		};

		if (
			href !==
			"/Productivity-App/static/media/anonymous-avatar.a54c7fe015003c448bc1.png"
		) {
			fetchUserAvatar();
		} else {
			setAvatarUrl(href);
		}
	}, [getUserAvatar, href]);

	return (
		<div
			className={`${styles["photo-box"]} ${className ? className : ""}`}
			style={{
				width: `${size}px`,
				height: `${size}px`,
				maxWidth: `${size}px`,
				maxHeight: `${size}px`,
			}}
			data-component={dataComponent ? dataComponent : null}>
			<img src={avatarUrl} alt='avatar' />
		</div>
	);
};

export default UserPhoto;
