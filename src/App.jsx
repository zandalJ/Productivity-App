import { Provider } from "react-redux";
import store from "./store/index";
import {
	Route,
	createHashRouter,
	createRoutesFromElements,
	RouterProvider,
} from "react-router-dom";
import MainLayout from "./Pages/MainLayout";
import HomePage from "./Pages/HomePage";
import DashboardPage from "./Pages/DashboardPage";
import TasksPage from "./Pages/TasksPage";
import TaskPage from "./Pages/TaskPage";
import RegisterPage from "./Pages/RegisterPage";
import HabitsPage from "./Pages/HabitsPage";
import HabitPage from "./Pages/HabitPage";
import TeamMembersPage from "./Pages/TeamMembersPage";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

function App() {
	const router = createHashRouter(
		createRoutesFromElements(
			<Route path='/' element={<MainLayout />}>
				<Route index path='/' element={<HomePage />} />
				<Route path='/dashboard' element={<DashboardPage />} />
				<Route path='/tasks' element={<TasksPage />} />
				<Route path='/tasks/:id' element={<TaskPage />} />
				<Route path='/register' element={<RegisterPage />} />
				<Route path='/login' element={<RegisterPage />} />
				<Route path='/habits' element={<HabitsPage />} />
				<Route path='/habits/:id' element={<HabitPage />} />
				<Route path='/team-members' element={<TeamMembersPage />} />
			</Route>
		)
	);
	return (
		<Provider store={store}>
			<LocalizationProvider dateAdapter={AdapterMoment}>
				<RouterProvider router={router} />
			</LocalizationProvider>
		</Provider>
	);
}

export default App;
