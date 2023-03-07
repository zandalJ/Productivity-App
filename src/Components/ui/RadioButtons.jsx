import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterSortingActions } from "../../store/filter-sorting";
import { useSearchParams } from "react-router-dom";
import styles from "./RadioButtons.module.scss";

const RadioButtons = ({ options, type }) => {
	const [filterParams, setFilterParams] = useSearchParams();
	const filterSorting = useSelector(state => state.filterSorting);
	const dispatch = useDispatch();
	const elements = useRef([]);

	const clickHandler = e => {
		let currentEl = elements.current.find(
			element => element.className === e.target.className
		);

		currentEl.checked = true;

		dispatch(
			filterSortingActions.filterChanger({
				filter: currentEl.value,
				sort: filterSorting.sort,
			})
		);
	};

	let filter = filterParams.get("filter");

	const output = options.map((option, index) => (
		<div className={styles["option-wrapper"]} key={index}>
			<input
				type='radio'
				value={option[1]}
				name={type}
				className={option[1]}
				ref={element => (elements.current[index] = element)}
				defaultChecked={filter === option[1]}
			/>
			<label
				htmlFor={option[1]}
				className={option[1]}
				id={filter}
				onClick={clickHandler}>
				{option[0]}
			</label>
		</div>
	));

	return <div className={styles.wrapper}>{output}</div>;
};

export default RadioButtons;
