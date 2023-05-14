import { useState, useCallback, useEffect } from "react";
import styles from "./TeamMembersForm.module.scss";
import { useForm } from "react-hook-form";
import SearchUser from "../searchUser/SearchUser";
import Button from "../ui/Button";
import { useSelector } from "react-redux";

const TeamMembersForm = ({ showModal, modal }) => {
	const [selectedUsers, setSelectedUsers] = useState([]);
	const [resetUsers, setResetUsers] = useState(false);

	const userData = useSelector(state => state.auth.userData);

	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm();

	const addUserHandler = useCallback(user => {
		setSelectedUsers([...user]);
	}, []);

	const submitHandler = data => {
		console.log(data);
	};

	return (
		<form onSubmit={handleSubmit(submitHandler)}>
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
