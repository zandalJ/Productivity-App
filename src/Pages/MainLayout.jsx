import { Outlet } from "react-router-dom";
import Nav from "../Components/navigation/Nav";
const MainLayout = () => {
	return (
		<div>
			<Nav></Nav>
			<main>
				<Outlet />
			</main>
		</div>
	);
};

export default MainLayout;
