import { Fragment, useState } from "react";
import useWidth from "../../hooks/useWidth";
import styles from "./UserDropdown.module.scss";
import UserPhoto from "../ui/UserPhoto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import DropdownList from "../dropdown/DropdownList";
const UserDropdown = () => {
	const [clicked, setClicked] = useState(false);
	const width = useWidth();
	const photoSize = width < 576 ? 35 : 60;

	const handleClicked = () => setClicked(before => !before);
	return (
		<Fragment>
			<div className={styles["dropdown-box"]} onClick={handleClicked}>
				<UserPhoto
					isOwner
					href='https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
					size={photoSize}
				/>
				<FontAwesomeIcon
					icon={clicked ? solid("chevron-up") : solid("chevron-down")}
					className={styles.icon}
				/>
			</div>
			<DropdownList isClicked={clicked}/>
		</Fragment>
	);
};

export default UserDropdown;
