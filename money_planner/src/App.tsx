import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import MainPage from './pages/Layout';
import { selectIsLoggedIn } from './store/auth-slice';
import { useAppSelector } from './hooks';
import MonthlyPlanList from './components/MonthlyPlanList/MonthlyPlanList';
import NewMonthlyPlan from './components/NewMonthlyPlan/NewMonthlyPlan';
import Layout from './pages/Layout';

function App() {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return (
    <Routes>
      <Route path="login" element={<LoginPage />}></Route>
      <Route
        path="/"
        element={isLoggedIn ? <Layout /> : <Navigate to="/login" />}
      >
        <Route path="/" element={<MonthlyPlanList />}></Route>
        <Route path="add" element={<NewMonthlyPlan />}></Route>
      </Route>
      <Route path="*" element={<NotFoundPage />}></Route>
    </Routes>
  );
}

export default App;
