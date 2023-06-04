import { Fragment, useState } from "react";
import useWidth from "../../hooks/useWidth";
import styles from "./UserDropdown.module.scss";
import UserPhoto from "../ui/UserPhoto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import DropdownList from "../dropdown/DropdownList";
import { useSelector } from "react-redux";
const UserDropdown = () => {
	const [clicked, setClicked] = useState(false);
	const width = useWidth();

	const userData = useSelector(state => state.auth.userData);

	const photoSize = width < 576 ? 35 : 60;

	const handleClicked = () => setClicked(before => !before);
	return (
		<Fragment>
			<div className={styles["dropdown-box"]} onClick={handleClicked}>
				<UserPhoto
					isOwner
					href={userData.avatarUrl}
					size={photoSize}
					uid={userData.id}
				/>
				<FontAwesomeIcon
					icon={clicked ? solid("chevron-up") : solid("chevron-down")}
					className={styles.icon}
				/>
			</div>
			<DropdownList isClicked={clicked} handleClicked={handleClicked} />
		</Fragment>
	);
};

export default UserDropdown;
