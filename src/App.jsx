import { Provider } from "react-redux";
import store from './store/index'
import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
} from "react-router-dom";
import MainLayout from "./Pages/MainLayout";
import HomePage from "./Pages/HomePage";
import DashboardPage from "./Pages/DashboardPage";
import TasksPage from "./Pages/TasksPage";

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path='/' element={<MainLayout />}>
				<Route index path='/' element={<HomePage />}></Route>
				<Route path='/dashboard' element={<DashboardPage />}></Route>
				<Route path='/tasks' element={<TasksPage />}></Route>
			</Route>
		)
	);

	return (
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	);
}

export default App;
