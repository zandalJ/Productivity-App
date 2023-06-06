import styles from "./AddedUsers.module.scss";
import UserPhoto from "../ui/UserPhoto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const AddedUsers = ({ users, removeUser }) => {
	const output = users.map(user => {
		return (
			<div key={user.id} className={styles["users--user-box"]}>
				<div className={styles["users--user"]} data-hover={user.name}>
					<button type='button' onClick={removeUser} data-id={user.id}>
						<FontAwesomeIcon icon={solid("xmark")} />
					</button>
					<UserPhoto
						size='40'
						href={user.avatarUrl}
						uid={user.id}
					/>
				</div>
			</div>
		);
	});

	return <div className={styles.users}>{output}</div>;
};

export default AddedUsers;
