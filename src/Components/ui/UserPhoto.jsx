import styles from './UserPhoto.module.scss'
const UserPhoto = ({isOwner, href, size}) => {
    return (
			<div
				className={styles["photo-box"]}
				style={{ width: `${size}px`, height: `${size}px` }}>
				<img src={href} alt='avatar' />
			</div>
		);
}

export default UserPhoto;   