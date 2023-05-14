import styles from "./MembersTable.module.scss";
import { useForm } from "react-hook-form";
import MembersRow from "./MembersRow";
import Button from "../ui/Button";

const MembersTable = ({ members }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const submitHandler = data => {
		console.log(data);
	};

	return (
		<form onSubmit={handleSubmit(submitHandler)} className={styles.table}>
			<MembersRow headerRow />
			{members.map(member => {
				return (
					<MembersRow
						userData={member}
						headerRow={false}
						register={register}
						key={member.id}
					/>
				);
			})}
			{errors?.user && (
				<p className={styles["error-message"]}>{errors?.user.message}</p>
			)}
			<Button submit className={styles.btn}>
				Kick
			</Button>
		</form>
	);
};

export default MembersTable;
