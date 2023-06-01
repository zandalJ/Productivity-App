import styles from "./UserPhoto.module.scss";
const UserPhoto = ({ href, size, className }) => {
	return (
		<div
			className={`${styles["photo-box"]} ${className ? className : ""}`}
			style={{
				width: `${size}px`,
				height: `${size}px`,
				maxWidth: `${size}px`,
				maxHeight: `${size}px`,
			}}>
			<img src={href} alt='avatar' />
		</div>
	);
};

export default UserPhoto;
