import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Alert,
  Button,
  IconButton,
  InputAdornment,
  Snackbar,
  TextField,
} from '@mui/material';
import React, { FormEvent, Fragment, useState } from 'react';
import { logInWithEmailAndPassword } from '../../firebaseAuth';
import { useAppDispatch } from '../../hooks';

import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState('test@test.hu');
  const [password, setPassword] = useState('test123');
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

    try {
      await logInWithEmailAndPassword(email, password, dispatch, navigate);
    } catch {
      setOpenSnackBar(true);
    }
  };

  const handleSnackBarClose = () => {
    setOpenSnackBar(false);
  };

  return (
    <Fragment>
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
      <Snackbar
        open={openSnackBar}
        autoHideDuration={5000}
        onClose={handleSnackBarClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Alert severity="error" sx={{ width: '100%' }}>
          Your e-mail or password are incorrect
        </Alert>
      </Snackbar>
    </Fragment>
  );
};

export default LoginForm;
