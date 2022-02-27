import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import React, { useState } from 'react';

import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <Form>
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
        type={showPassword ? 'text' : 'password'}
        sx={{ marginBottom: '20px' }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {' '}
              <IconButton onClick={handleClickShowPassword}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button variant="outlined">LOGIN</Button>
    </Form>
  );
};

export default LoginForm;
