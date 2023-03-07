import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterSortingActions } from "../../store/filter-sorting";
import { useSearchParams } from "react-router-dom";
import styles from "./Fieldset.module.scss";

const Fieldset = ({ title, options, type }) => {
	const filters = useSelector(state => state.filterSorting);
	const dispatch = useDispatch()

	const elements = useRef([])

	const [filter, setFilter] = useSearchParams()

	const clickHandler = (e) => {
		let currentEl = elements.current.find(
			element => element.className === e.target.className
		);

		dispatch(
			filterSortingActions.filterChanger({ filter: currentEl.value, sort: filters.sort })
		);
	}

    const optionsOutput = options.map((option, index) => (
			<div className={styles["wrapper--option"]} key={index}>
				<input
					type='radio'
					value={option[1]}
					name={type}
					className={option[1]}
					onClick={clickHandler}
					ref={element => (elements.current[index] = element)}
					defaultChecked={filter.get("filter") === option[1]}
				/>
				<label htmlFor={option[1]}>{option[0]}</label>
			</div>
		));
	return (
		<fieldset className={styles.wrapper}>
			<legend>{title}</legend>
			{optionsOutput}
		</fieldset>
	);
};

export default Fieldset;
