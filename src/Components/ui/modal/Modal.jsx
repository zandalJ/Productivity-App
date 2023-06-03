import { Fragment } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.scss";
const Modal = ({ modal, showModal, children, top = false }) => {
	const closeModalHandler = e => {
		if (e.target.dataset.element) {
			showModal();
		}
	};

	return (
		<Fragment>
			{createPortal(
				<div
					className={`${styles.modal} ${
						modal ? styles["modal--show"] : styles["modal--hidden"]
					} ${top ? styles["modal--higher"] : ""}`}
					data-element='modal'
					onClick={closeModalHandler}>
					{children}
				</div>,
				document.getElementById("modal-root")
			)}
		</Fragment>
	);
};

export default Modal;
