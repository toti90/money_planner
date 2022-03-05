import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import styles from 'styled-components';
import { logoutUser } from '../../firebaseAuth';
import { useAppDispatch } from '../../hooks';

const HeaderContainer = styles.div`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid grey;
`;

const Title = styles.h1`
  margin-left: 16px;
  font-family: 'Hubballi', cursive;
`;

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const logoutHandler = () => {
    logoutUser(dispatch, navigate);
  };
  return (
    <HeaderContainer>
      <Title>MoneyPlanner</Title>
      <Button
        variant="contained"
        type="button"
        sx={{ marginRight: '16px', height: '40px' }}
        onClick={logoutHandler}
      >
        LOGOUT
      </Button>
    </HeaderContainer>
  );
};

export default Header;
