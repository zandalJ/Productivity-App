import styles from './HomePage.module.scss'
import Wrapper from "../Components/ui/Wrapper";
import Button from '../Components/ui/Button';
import header from '../img/header.svg'
const HomePage = () => {
	return (
		<Wrapper center>
			<div className={styles.box}>
				<h1>Best productivity app for everyone!</h1>
				<p>Increase your efficiency</p>
				<Button>Get started</Button>
			</div>
			<img src={header} alt="header" className={styles.img}/>
		</Wrapper>
	);
};

export default HomePage;
