import { useState, useEffect } from "react";
import styles from "./SearchUser.module.scss";
import AddUser from "./AddUser";
import { ElementsPagination } from "../pagination/Pagination";
import AddedUsers from "./AddedUsers";

const DUMMY_USERS = [
	{ name: "Fabian", mail: "mail@mail.com", id: "user1" },
	{ name: "Arek", mail: "mail@mail.com", id: "user2" },
	{ name: "Lena", mail: "mail@mail.com", id: "user3" },
	{ name: "Tomek", mail: "mail@mail.com", id: "user4" },
	{ name: "Fabian", mail: "mail@mail.com", id: "user5" },
	{ name: "Tomek", mail: "mail@mail.com", id: "user6" },
	{ name: "Dariusz", mail: "mail@mail.com", id: "user7" },
	{ name: "Darek", mail: "mail@mail.com", id: "user8" },
];

const SearchUser = ({ className, addUsers }) => {
	const [searchText, setSearchText] = useState("");
	const [searchEl, setSearchEl] = useState(DUMMY_USERS);
	const [addedUsers, setAddedUsers] = useState([]);
	const searchHandler = e => {
		const inputText = e.target.value.toLowerCase();
		const outputEl = DUMMY_USERS.filter(user => {
			return user.name.toLowerCase().includes(inputText) && checkUsers(user);
		});
		setSearchText(inputText);
		setSearchEl(outputEl);
	};

	const checkUsers = user => {
		if (addedUsers.length > 0) {
			for (let i = 0; i < addedUsers.length; i++) {
				if (user.id === addedUsers[i].id) {
					return false;
				}
			}
		}
		return true;
	};

	const [page, setPage] = useState(1);
	const itemsPerPage = 4;

	const pageHandler = (e, p) => {
		setPage(p);
	};

	const addUsersHandler = arr => {
		setSearchEl(searchEl.filter(el => el.id !== arr[0]));
		DUMMY_USERS.forEach(user => {
			arr.forEach(el => {
				if (user.id === el) {
					setAddedUsers(oldArray => [...oldArray, user]);
					arr.shift();
				}
			});
		});
	};

	const removeUserHandler = e => {
		const user = e.target.hasAttribute("data-id")
			? e.target
			: e.target.closest("[data-id]");
		setAddedUsers(addedUsers.filter(el => el.id !== user.dataset.id));
	};

	useEffect(() => {
		addUsers(addedUsers);
	}, [addedUsers]);

	const startIndex = (page - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const displayedItems = searchEl.slice(startIndex, endIndex);

	const count = Math.ceil(searchEl.length / itemsPerPage);

	return (
		<div className={`${styles.box} ${className ? className : null}`}>
			<label>Add Collaborators</label>
			<input
				type='search'
				placeholder='Search by name'
				onChange={searchHandler}
				value={searchText}
			/>
			<p className={styles["users-text"]}>Users</p>
			{searchEl && (
				<AddUser elements={displayedItems} addUsers={addUsersHandler} />
			)}
			{searchEl && (
				<ElementsPagination elementsPerPage={count} onChange={pageHandler} />
			)}
			{addedUsers && (
				<AddedUsers users={addedUsers} removeUser={removeUserHandler} />
			)}
		</div>
	);
};

export default SearchUser;
