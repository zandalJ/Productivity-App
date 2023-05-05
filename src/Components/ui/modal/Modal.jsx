import styles from "./Modal.module.scss";
const Modal = ({ modal, showModal, children }) => {
	const closeModalHandler = e => {
		if (e.target.dataset.element) {
			showModal();
		}
	};

	return (
		<div
			className={`${styles.modal} ${
				modal ? styles["modal--show"] : styles["modal--hidden"]
			}`}
			data-element='modal'
			onClick={closeModalHandler}>
			{children}
		</div>
	);
};

export default Modal;
