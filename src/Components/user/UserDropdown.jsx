import styles from "./UserDropdown.module.scss";
import useWidth from "../../hooks/useWidth";
import UserPhoto from "../ui/UserPhoto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
const UserDropdown = () => {
    const width = useWidth()
    const photoSize = width<576 ? 35 : 60;
	return (
		<div className={styles["dropdown-box"]}>
			<UserPhoto
				isOwner
				href='https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
                size={photoSize}
			/>
			<FontAwesomeIcon icon={solid("chevron-down")} className={styles.icon} />
		</div>
	);
};

export default UserDropdown;
