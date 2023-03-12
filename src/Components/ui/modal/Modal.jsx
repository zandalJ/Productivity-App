import styles from "./Modal.module.scss";
import ModalContent from "./ModalContent";
const Modal = ({ modal, showModal ,location }) => {
	return (
		<div
			className={`${styles.modal} ${
				modal ? styles["modal--show"] : styles["modal--hidden"]
			}`}>
			<ModalContent location={location} showModal={showModal}/>
		</div>
	);
};

export default Modal;
