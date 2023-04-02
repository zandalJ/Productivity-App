import { useState } from "react";

const usePagination = (elPerPage, elements) => {
	const [page, setPage] = useState(1);

	const pageHandler = (e, p) => {
		setPage(p);
	};

	const startIndex = (page - 1) * elPerPage;
	const endIndex = startIndex + elPerPage;
	const displayedItems = elements.slice(startIndex, endIndex);
	const countEl = Math.ceil(elements.length / elPerPage);

	return { pageHandler, items: displayedItems, countEl };
};

export default usePagination;