import styles from "./MembersTable.module.scss";
import { useForm } from "react-hook-form";
import MembersRow from "./MembersRow";
import Button from "../ui/Button";
import { deleteTeamMembers } from "../../store/auth-actions";
import { useDispatch } from "react-redux";
import NoDataInfo from "../ui/NoDataInfo";

const MembersTable = ({ members }) => {
	const dispatch = useDispatch();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const submitHandler = data => {
		const deleteData = !Array.isArray(data.user) ? [data.user] : [...data.user];
		dispatch(deleteTeamMembers(deleteData));
		reset();
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
				<NoDataInfo message='No users data.' />
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
