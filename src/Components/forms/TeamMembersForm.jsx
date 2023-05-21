import { useState, useCallback, Fragment, useEffect } from "react";
import styles from "./TeamMembersForm.module.scss";
import SearchUser from "../searchUser/SearchUser";
import Button from "../ui/Button";
import { useSelector, useDispatch } from "react-redux";
import { changeUserData } from "../../store/auth-actions";

const TeamMembersForm = ({ showModal, modal }) => {
	const dispatch = useDispatch();
	const userData = useSelector(state => state.auth.userData);

	const [selectedUsers, setSelectedUsers] = useState([]);
	const [resetUsers, setResetUsers] = useState(false);

	const addUserHandler = useCallback(user => {
		setSelectedUsers([...user]);
	}, []);

	const submitHandler = () => {
		const data = selectedUsers;
		dispatch(changeUserData(data));
		showModal();
		setResetUsers(before => !before);
	};

	useEffect(() => {
		if (!modal) setResetUsers(true);
		if (modal) setResetUsers(false);
	}, [modal]);

	return (
		<Fragment>
			{userData.teamMembers && (
				<form onSubmit={submitHandler}>
					<SearchUser
						className={styles["team-members"]}
						fetchedUsers={userData.teamMembers || []}
						addUsers={addUserHandler}
						resetUsers={resetUsers}
					/>
					<Button submit>Add Users</Button>
				</form>
			)}
		</Fragment>
	);
};

export default TeamMembersForm;
