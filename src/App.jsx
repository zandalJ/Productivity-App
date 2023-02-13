import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
} from "react-router-dom";
import MainLayout from "./Pages/MainLayout";
import HomePage from "./Pages/HomePage";

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path='/' element={<MainLayout />}>
				<Route index path='/' element={<HomePage />}></Route>
			</Route>
		)
	);

	return <RouterProvider router={router} />;
}

export default App;
