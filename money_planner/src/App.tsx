import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import MainPage from './pages/MainPage';
import { selectIsLoggedIn } from './store/auth-slice';
import { useAppSelector } from './hooks';

function App() {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return (
    <Routes>
      <Route
        path=""
        element={isLoggedIn ? <Navigate to="main" /> : <Navigate to="auth" />}
      ></Route>
      <Route
        path="auth"
        element={isLoggedIn ? <Navigate to="/main" /> : <LoginPage />}
      ></Route>
      {isLoggedIn && <Route path="main" element={<MainPage />}></Route>}
      <Route path="*" element={<NotFoundPage />}></Route>
    </Routes>
  );
}

export default App;
