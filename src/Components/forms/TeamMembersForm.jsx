import { useState, useCallback, useEffect } from "react";
import styles from "./TeamMembersForm.module.scss";
import SearchUser from "../searchUser/SearchUser";
import Button from "../ui/Button";
import { useSelector, useDispatch } from "react-redux";
import { changeUserData, getAllUsers } from "../../store/auth-actions";

const TeamMembersForm = ({ showModal, modal }) => {
	const dispatch = useDispatch();

	const [selectedUsers, setSelectedUsers] = useState([]);
	const [resetUsers, setResetUsers] = useState(false);

	const userData = useSelector(state => state.auth.userData);

	const addUserHandler = useCallback(user => {
		setSelectedUsers([...user]);
	}, []);

	const submitHandler = () => {
		const data = selectedUsers;
		console.log(data);
		dispatch(changeUserData(data));
	};

	useEffect(() => {
		const userHandler = async () => {
			const testArr = await getAllUsers();
			console.log(testArr);
		};

		userHandler();
	}, []);

	return (
		<form onSubmit={submitHandler}>
			<SearchUser
				className={styles["team-members"]}
				fetchedUsers={userData.teamMembers || []}
				addUsers={addUserHandler}
				resetUsers={resetUsers}
			/>
			<Button submit>Add Users</Button>
		</form>
	);
};

export default TeamMembersForm;
