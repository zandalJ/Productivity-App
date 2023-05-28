import styles from "./ProfilePage.module.scss";
import Wrapper from "../Components/ui/Wrapper";
import Profile from "../Components/profile/Profile";

const ProfilePage = () => {
	return (
		<Wrapper className={styles.wrapper}>
			<Profile />
		</Wrapper>
	);
};

export default ProfilePage;
