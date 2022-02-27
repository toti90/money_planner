import { Card, CardHeader } from '@mui/material';
import LoginForm from '../components/Login/LoginForm';

import styled from 'styled-components';

const Wrapper = styled.section`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const LoginPage = () => {
  return (
    <Wrapper>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '30px 50px 50px 50px',
        }}
      >
        <CardHeader title="Login" subheader="Please login to the site" />
        <LoginForm></LoginForm>
      </Card>
    </Wrapper>
  );
};

export default LoginPage;
