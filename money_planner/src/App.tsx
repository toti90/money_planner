import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import { selectIsLoggedIn } from './store/auth-slice';
import { useAppSelector } from './hooks';
import PlanList from './components/PlanList/PlanList';
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
        <Route path="/" element={<PlanList />}></Route>
      </Route>
      <Route path="*" element={<NotFoundPage />}></Route>
    </Routes>
  );
}

export default App;
