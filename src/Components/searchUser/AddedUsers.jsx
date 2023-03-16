import styles from "./AddedUsers.module.scss";
import UserPhoto from "../ui/UserPhoto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const AddedUsers = ({ users }) => {
	const output = users.map(user => {
		return (
			<div key={user.id} className={styles["users--user-box"]}>
				<div className={styles['users--user']}>
					<button type="button">
						<FontAwesomeIcon icon={solid("xmark")} />
					</button>
					<UserPhoto
						size='40'
						href='https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
					/>
				</div>
			</div>
		);
	});

	return <div className={styles.users}>{output}</div>;
};

export default AddedUsers;
