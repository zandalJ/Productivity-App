import { Fragment } from "react";
import styles from "./AddUser.module.scss";
import UserPhoto from "../ui/UserPhoto";
import BorderButton from "../ui/BorderButton";
import useWidth from "../../hooks/useWidth";

const AddUser = ({ elements, addUsers }) => {
	const width = useWidth();
	const photoSize = width < 768 ? "30" : "40";

	let addedUsers = [];
	const addUserHandler = e => {
		addedUsers.push(e.target.dataset.id);
		addUsers(addedUsers);
	};

	const output = elements.map(el => {
		return (
			<div key={el.id} className={styles.box}>
				<div className={styles["box--left"]}>
					<UserPhoto href={el.avatarUrl} size={photoSize} uid={el.id} />
					<div className={styles["user-data-box"]}>
						<p className={styles["user-data-box--data"]}>{el.name}</p>
						<p
							className={
								styles[("user-data-box--data", "user-data-box--mail")]
							}>
							{el.mail}
						</p>
					</div>
				</div>
				<BorderButton
					className={styles.btn}
					dataAttribute={{ key: "id", value: el.id }}
					onClick={addUserHandler}>
					Add
				</BorderButton>
			</div>
		);
	});

	return (
		<Fragment>
			{elements.length > 0 ? (
				output
			) : (
				<p className={styles.text}>No users found.</p>
			)}
		</Fragment>
	);
};

export default AddUser;
