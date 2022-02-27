import React from 'react';
import styles from 'styled-components';

const MainContentContainer = styles.div`
  width: 100vw;
  min-height: calc(100vh - 80px);
`;

const MainContent = () => {
  return <MainContentContainer></MainContentContainer>;
};

export default MainContent;
