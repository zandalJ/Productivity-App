import { useState } from "react";
import styles from "./SearchUser.module.scss";

const DUMMY_USERS = [
	{ name: "Fabian" },
	{ name: "Arek" },
	{ name: "Lena" },
	{ name: "Tomek" },
	{ name: "Fabian" },
	{ name: "Tomek" },
	{ name: "Dariusz" },
	{ name: "Darek" },
];

const SearchUser = ({ className }) => {
	const [searchText, setSearchText] = useState("");
	const [searchEl, setSearchEl] = useState([])
	const searchHandler = e => {
		const inputText = e.target.value.toLowerCase();
		const outputEl = DUMMY_USERS.filter(user => {
			return user.name.toLowerCase().includes(inputText);
		});
		setSearchText(inputText)
		setSearchEl(outputEl)
	};

	return (
		<div className={`${styles.box} ${className ? className : null}`}>
			<label>Add Collaborators</label>
			<input
				type='search'
				placeholder='search by name'
				onChange={searchHandler}
				value={searchText}
			/>
			{searchEl && searchEl.map((el, index) => {
				return <p key={index}>{el.name}</p>
			})}
		</div>
	);
};

export default SearchUser;
