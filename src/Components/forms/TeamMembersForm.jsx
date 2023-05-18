import { useState, useCallback, Fragment } from "react";
import styles from "./TeamMembersForm.module.scss";
import SearchUser from "../searchUser/SearchUser";
import Button from "../ui/Button";
import { useSelector, useDispatch } from "react-redux";
import { changeUserData } from "../../store/auth-actions";

const TeamMembersForm = ({ showModal }) => {
	const dispatch = useDispatch();

	const [selectedUsers, setSelectedUsers] = useState([]);

	const userData = useSelector(state => state.auth.userData);

	const addUserHandler = useCallback(user => {
		setSelectedUsers([...user]);
	}, []);

	const submitHandler = () => {
		const data = selectedUsers;
		dispatch(changeUserData(data));
		showModal();
	};

	return (
		<Fragment>
			{userData.teamMembers && (
				<form onSubmit={submitHandler}>
					<SearchUser
						className={styles["team-members"]}
						fetchedUsers={userData.teamMembers || []}
						addUsers={addUserHandler}
					/>
					<Button submit>Add Users</Button>
				</form>
			)}
		</Fragment>
	);
};

export default TeamMembersForm;
