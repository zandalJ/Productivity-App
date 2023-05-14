const Checkbox = ({ className, register, userId }) => {
	return (
		<input
			type='checkbox'
			name='user'
			value={userId}
			className={className ? className : ""}
			{...(register && register("user", { required: "Please select user" }))}
		/>
	);
};

export default Checkbox;
