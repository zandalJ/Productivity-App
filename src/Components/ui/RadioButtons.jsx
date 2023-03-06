import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterSortingActions } from "../../store/filter-sorting";
import styles from "./RadioButtons.module.scss";

const RadioButtons = ({ options, type }) => {
	const defaultFilter = useSelector(state => state.filterSorting.filter);
	const defaultSort = useSelector(state => state.filterSorting.sort)
	const dispatch = useDispatch();
	const [filter, setFilter] = useState(defaultFilter);
	const elements = useRef([]);

	const clickHandler = e => {
		let currentEl = elements.current.find(
			element => element.className === e.target.className
		);
		currentEl.checked = true;
		setFilter(currentEl.value);
	};

	useEffect(() => {
		dispatch(filterSortingActions.filterChanger({ filter: filter , sort: defaultSort}));
	}, [dispatch, filter, defaultSort]);

	const output = options.map((option, index) => (
		<div className={styles["option-wrapper"]} key={index}>
			<input
				type='radio'
				value={option[1]}
				name={type}
				className={option[1]}
				ref={element => (elements.current[index] = element)}
			/>
			<label htmlFor={option[1]} className={option[1]} onClick={clickHandler}>
				{option[0]}
			</label>
		</div>
	));

	return <div className={styles.wrapper}>{output}</div>;
};

export default RadioButtons;
