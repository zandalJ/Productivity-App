import styles from "./MembersTable.module.scss";
import { useForm } from "react-hook-form";
import MembersRow from "./MembersRow";
import Button from "../ui/Button";
import { deleteTeamMembers } from "../../store/auth-actions";
import { useDispatch } from "react-redux";

const MembersTable = ({ members }) => {
	const dispatch = useDispatch();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const submitHandler = data => {
		dispatch(deleteTeamMembers(data));
	};

	return (
		<form onSubmit={handleSubmit(submitHandler)} className={styles.table}>
			<MembersRow headerRow />
			{members.length > 0 ? (
				members.map(member => {
					return (
						<MembersRow
							userData={member}
							headerRow={false}
							register={register}
							key={member.id}
						/>
					);
				})
			) : (
				<p className={styles["no-user-text"]}>No users data</p>
			)}
			{errors?.user && (
				<p className={styles["error-message"]}>{errors?.user.message}</p>
			)}
			{members.length > 0 && (
				<Button submit className={styles.btn}>
					Kick
				</Button>
			)}
		</form>
	);
};

export default MembersTable;
