import { useRef } from "react";
import useSetFilter from "../../hooks/useSetFilter";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import styles from "./Fieldset.module.scss";

const Fieldset = ({ title, options, type, sort }) => {
	const filters = useSelector(state => state.filterSorting);
	const elements = useRef([]);
	const [query, setQuery] = useSearchParams();
	const { setFilterEvent } = useSetFilter(
		elements,
		filters.sort,
		filters.filter
	);

	const clickHandler = e => setFilterEvent(e);

	const optionsOutput = options.map((option, index) => (
		<div className={styles["wrapper--option"]} key={index}>
			<input
				type='radio'
				data-type={`${!sort ? "filter" : "sort"}`}
				value={option[1]}
				name={type}
				className={option[1]}
				onClick={clickHandler}
				ref={element => (elements.current[index] = element)}
				defaultChecked={query.get(`${!sort ? "filter" : "sort"}`) === option[1]}
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
