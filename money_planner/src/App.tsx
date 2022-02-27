import { Fragment } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import MainPage from './pages/MainPage';

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="" element={<Navigate to="auth" />}></Route>
        <Route path="main" element={<MainPage />}></Route>
        <Route path="auth" element={<LoginPage />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </Fragment>
  );
}

export default App;
