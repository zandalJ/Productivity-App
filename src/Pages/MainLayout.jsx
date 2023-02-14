import { Outlet } from "react-router-dom";
import HeaderNav from "../Components/navigation/HeaderNav";
import SideNav from "../Components/navigation/SideNav";
const MainLayout = () => {
	return (
		<div>
			<HeaderNav></HeaderNav>
			<main>
				<SideNav/>
				<Outlet />
			</main>
		</div>
	);
};

export default MainLayout;
