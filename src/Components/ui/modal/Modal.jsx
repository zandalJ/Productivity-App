import styles from "./Modal.module.scss";
import ModalContent from "./ModalContent";
const Modal = ({ modal, showModal, location }) => {

	const closeModalHandler = (e) => {
		if(e.target.dataset.element){
			showModal()
		}
	}

	return (
		<div
			className={`${styles.modal} ${
				modal ? styles["modal--show"] : styles["modal--hidden"]
			}`}
			data-element="modal"
			onClick={closeModalHandler}>
			<ModalContent location={location} showModal={showModal} modal={modal} />
		</div>
	);
};

export default Modal;
