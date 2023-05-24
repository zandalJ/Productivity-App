import { useState, useEffect, useCallback } from "react";
import styles from "./SearchUser.module.scss";
import AddUser from "./AddUser";
import { ElementsPagination } from "../pagination/Pagination";
import AddedUsers from "./AddedUsers";
import usePagination from "../../hooks/usePagination";
import { getAllUsers } from "../../store/auth-actions";
import { useLocation } from "react-router-dom";

const SearchUser = ({ className, addUsers, resetUsers, fetchedUsers }) => {
	const [users, setUsers] = useState([]);
	const [searchText, setSearchText] = useState("");
	const [searchEl, setSearchEl] = useState([]);
	const [addedUsers, setAddedUsers] = useState(fetchedUsers);

	const location = useLocation();

	useEffect(() => {
		const userHandler = async () => {
			const usersArray = await getAllUsers();
			setUsers(usersArray);
		};

		userHandler();
	}, []);

	useEffect(() => {
		if (location.pathname === "/team-members") {
			setAddedUsers(fetchedUsers);
		}
	}, [fetchedUsers, location.pathname]);

	useEffect(() => {
		if (resetUsers) {
			setSearchEl(users);
			setAddedUsers([]);
			setSearchText("");
		}
	}, [resetUsers, users]);

	const checkUsers = useCallback(
		user => {
			if (addedUsers.length > 0) {
				for (let i = 0; i < addedUsers.length; i++) {
					if (user.id === addedUsers[i].id) {
						return false;
					}
				}
			}
			return true;
		},
		[addedUsers]
	);

	useEffect(() => {
		const outputUsers = users.filter(user => {
			return checkUsers(user);
		});
		setSearchEl(outputUsers);
	}, [checkUsers, users]);

	const itemsPerPage = 4;

	const { pageHandler, items, countEl } = usePagination(itemsPerPage, searchEl);

	const searchHandler = e => {
		const inputText = e.target.value.toLowerCase();
		const outputEl = users.filter(user => {
			return user.name.toLowerCase().includes(inputText) && checkUsers(user);
		});
		setSearchEl(outputEl);
		setSearchText(inputText);
	};

	const addUsersHandler = arr => {
		setSearchEl(searchEl.filter(el => el.id !== arr[0]));
		users.forEach(user => {
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
		const outputEl = users.find(el => {
			return (
				el.name.toLowerCase().includes(searchText) && el.id === user.dataset.id
			);
		});
		const output = outputEl !== undefined ? outputEl : false;
		if (output) {
			setSearchEl([...searchEl, output]);
		} else {
			return;
		}
	};

	useEffect(() => {
		addUsers(addedUsers);
	}, [addedUsers, addUsers]);

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
			{searchEl && <AddUser elements={items} addUsers={addUsersHandler} />}
			{searchEl && (
				<ElementsPagination elementsPerPage={countEl} onChange={pageHandler} />
			)}
			{addedUsers && (
				<AddedUsers users={addedUsers} removeUser={removeUserHandler} />
			)}
		</div>
	);
};

export default SearchUser;
