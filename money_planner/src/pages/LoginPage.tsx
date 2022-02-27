import { Card, CardHeader, TextField } from '@mui/material';
import React from 'react';

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
      <Card sx={{ display: 'flex', flexDirection: 'column', padding: '50px' }}>
        <CardHeader title="Login" subheader="Please login to the site" />
        <TextField
          required
          id="outlined-required"
          label="E-mail"
          type="email"
          sx={{ marginBottom: '20px' }}
        />
        <TextField
          required
          id="outlined-required"
          label="Password"
          type="password"
        />
      </Card>
    </Wrapper>
  );
};

export default LoginPage;
