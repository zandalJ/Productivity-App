import { useState } from "react";
import styles from "./SearchUser.module.scss";
import AddUser from "./AddUser";

const DUMMY_USERS = [
	{ name: "Fabian", mail: "mail@mail.com" },
	{ name: "Arek", mail: "mail@mail.com" },
	{ name: "Lena", mail: "mail@mail.com" },
	{ name: "Tomek", mail: "mail@mail.com" },
	{ name: "Fabian", mail: "mail@mail.com" },
	{ name: "Tomek", mail: "mail@mail.com" },
	{ name: "Dariusz", mail: "mail@mail.com" },
	{ name: "Darek", mail: "mail@mail.com" },
];

const SearchUser = ({ className }) => {
	const [searchText, setSearchText] = useState("");
	const [searchEl, setSearchEl] = useState(DUMMY_USERS);
	const searchHandler = e => {
		const inputText = e.target.value.toLowerCase();
		const outputEl = DUMMY_USERS.filter(user => {
			return user.name.toLowerCase().includes(inputText);
		});
		setSearchText(inputText);
		setSearchEl(outputEl);
	};

	return (
		<div className={`${styles.box} ${className ? className : null}`}>
			<label>Add Collaborators</label>
			<input
				type='search'
				placeholder='Search by name'
				onChange={searchHandler}
				value={searchText}
			/>
			<p className={styles['users-text']}>Users</p>
			{searchEl && <AddUser elements={searchEl} />}
		</div>
	);
};

export default SearchUser;
