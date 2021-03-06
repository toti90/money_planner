import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import { selectIsLoggedIn } from './store/auth-slice';
import { useAppSelector } from './hooks';
import PlanList from './components/PlanList/PlanList';
import Layout from './pages/Layout';
import { Backdrop, CircularProgress } from '@mui/material';
import { Fragment } from 'react';
import { selectIsLoading } from './store/global-slice';

function App() {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const isLoading = useAppSelector(selectIsLoading);

  return (
    <Fragment>
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
      {isLoading && (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </Fragment>
  );
}

export default App;
