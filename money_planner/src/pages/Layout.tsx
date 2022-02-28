import { Fragment } from 'react';

import Header from '../components/Shared/Header';
import styles from 'styled-components';
import { Outlet } from 'react-router-dom';

const MainContent = styles.div`
  width: 100vw;
  min-height: calc(100vh - 80px);
  background-color: #dbdbdb;
`;

const Layout = () => {
  return (
    <Fragment>
      <Header></Header>
      <MainContent>
        <Outlet />
      </MainContent>
    </Fragment>
  );
};

export default Layout;
