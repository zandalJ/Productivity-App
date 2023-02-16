import styles from './HomePage.module.scss'
import Wrapper from "../Components/ui/Wrapper";
import Button from '../Components/ui/Button';
import header from '../img/header.svg'
import { Link } from 'react-router-dom';
const HomePage = () => {
	return (
		<Wrapper center>
			<div className={styles.box}>
				<h1>Best productivity app for everyone!</h1>
				<p>Increase your efficiency</p>
				<Link to="/test">
					<Button>Get started</Button>
				</Link>
			</div>
			<img src={header} alt='header' className={styles.img} />
		</Wrapper>
	);
};

export default HomePage;
