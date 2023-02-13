import { useState } from "react";

 const useWidth = () => {
	const [width, setWidth] = useState(window.innerWidth);

	window.addEventListener("resize", () => setWidth(window.innerWidth));
	return width;
};

export default useWidth
