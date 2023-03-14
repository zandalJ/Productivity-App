import styles from "./AddUser.module.scss";
import UserPhoto from "../ui/UserPhoto";
import BorderButton from "../ui/BorderButton";
import useWidth from "../../hooks/useWidth";

const AddUser = ({ elements }) => {
	const width = useWidth();
	const photoSize = width < 768 ? "30" : "40";
	const output = elements.map((el, index) => {
		return (
			<div key={index} className={styles.box}>
				<div className={styles["box--left"]}>
					<UserPhoto
						href='https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
						size={photoSize}
					/>
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
				<BorderButton className={styles.btn}>Add</BorderButton>
			</div>
		);
	});

	return output;
};

export default AddUser;
