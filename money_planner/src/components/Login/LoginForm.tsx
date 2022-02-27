import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import React, { FormEvent, useState } from 'react';
import { logInWithEmailAndPassword } from '../../firebase';
import { useAppDispatch } from '../../hooks';

import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState('test@test.hu');
  const [password, setPassword] = useState('test123');
  const dispatch = useAppDispatch();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onSubmitHandler = async (event: FormEvent) => {
    event.preventDefault();

    await logInWithEmailAndPassword(email, password, dispatch);
  };

  return (
    <Form onSubmit={onSubmitHandler}>
      <TextField
        required
        id="email"
        label="E-mail"
        type="email"
        sx={{ marginBottom: '20px' }}
        value={email}
        onChange={handleEmailChange}
      />
      <TextField
        required
        id="password"
        label="Password"
        type={showPassword ? 'text' : 'password'}
        sx={{ marginBottom: '20px' }}
        onChange={handlePasswordChange}
        value={password}
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
      <Button variant="outlined" type="submit">
        LOGIN
      </Button>
    </Form>
  );
};

export default LoginForm;
