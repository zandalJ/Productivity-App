import { Fragment, useState, useEffect } from "react";
import useWidth from "../../hooks/useWidth";
import styles from "./UserDropdown.module.scss";
import UserPhoto from "../ui/UserPhoto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import DropdownList from "../dropdown/DropdownList";
import { useSelector } from "react-redux";
import useOutsideClicks from "../../hooks/useOutsideClicks";
const UserDropdown = () => {
	const isClicked = useOutsideClicks();

	const [clicked, setClicked] = useState(false);
	const width = useWidth();

	const userData = useSelector(state => state.auth.userData);

	const photoSize = width < 576 ? 35 : 60;

	const handleClicked = () => setClicked(before => !before);

	useEffect(() => {
		if (isClicked) {
			setClicked(false);
		}
	}, [isClicked]);

	return (
		<Fragment>
			<div
				className={styles["dropdown-box"]}
				onClick={handleClicked}
				data-component='dropdown'>
				<UserPhoto
					isOwner
					href={userData.avatarUrl}
					size={photoSize}
					uid={userData.uid}
					dataComponent='dropdown'
				/>
				<FontAwesomeIcon
					icon={clicked ? solid("chevron-up") : solid("chevron-down")}
					className={styles.icon}
					data-component='dropdown'
				/>
			</div>
			<DropdownList isClicked={clicked} handleClicked={handleClicked} />
		</Fragment>
	);
};

export default UserDropdown;
