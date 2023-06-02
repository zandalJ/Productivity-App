import styles from './ErrorPage.module.scss'
import Layout from "../Components/ui/Layout";
import svgIllustration from "../img/error.svg";
import Button from "../Components/ui/Button";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
	const navigate = useNavigate();

	return (
		<Layout>
			<div className={styles.box}>
				<img src={svgIllustration} alt='error page illustration' />
				<h1>Something went wrong.</h1>
				<Button onClick={() => navigate(-1)}>Back to previous page</Button>
			</div>
		</Layout>
	);
};

export default ErrorPage;
