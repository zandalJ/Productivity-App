import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterSortingActions } from "../../store/filter-sorting";
import styles from "./RadioButtons.module.scss";

const RadioButtons = ({ options, type }) => {
	const filterSorting = useSelector(state => state.filterSorting);
	const dispatch = useDispatch();
	const elements = useRef([]);

	const clickHandler = e => {
		let currentEl = elements.current.find(
			element => element.className === e.target.className
		);

		dispatch(
			filterSortingActions.filterChanger({
				filter: currentEl.value,
				sort: filterSorting.sort,
			})
		);
	};

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
