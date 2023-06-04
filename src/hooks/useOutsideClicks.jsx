import { useState, useEffect } from "react";

const useOutsideClicks = () => {
	const [isClicked, setIsClicked] = useState(false);

	useEffect(() => {
		const handleClicks = e => {
			if (
				!(
					e.target.dataset.component || e.target.parentElement.dataset.component
				)
			) {
				setIsClicked(true);

				setTimeout(() => {
					setIsClicked(false);
				}, 1000);
			}
		};

		window.addEventListener("click", handleClicks);

		return () => {
			window.removeEventListener("click", handleClicks);
		};
	}, []);

	return isClicked;
};

export default useOutsideClicks;
