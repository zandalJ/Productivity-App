import styles from './LayoutHeaderWrapper.module.scss'
import HeadingText from "./HeadingText";
const LayoutHeaderWrapper = ({ children }) => {
	return (
		<div className={styles.wrapper}>
			<HeadingText />
			{children}
		</div>
	);
};

export default LayoutHeaderWrapper;
