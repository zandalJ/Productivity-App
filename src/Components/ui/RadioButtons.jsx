import { useRef } from "react";
import useSetFilter from "../../hooks/useSetFilter";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import styles from "./RadioButtons.module.scss";

const RadioButtons = ({ options, type }) => {
	const [filterParams, setFilterParams] = useSearchParams();
	const filterSorting = useSelector(state => state.filterSorting);
	const elements = useRef([]);
	const { setFilterEvent } = useSetFilter(elements, filterSorting.sort);

	const clickHandler = e => {
		setFilterEvent(e);
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
