import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const toastify = message => {
	toast.success(message, {
		position: "top-right",
		autoClose: 2000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: false,
		progress: undefined,
		theme: "colored",
	});
};
