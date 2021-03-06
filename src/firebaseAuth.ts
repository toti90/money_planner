import { AnyAction } from '@reduxjs/toolkit';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Dispatch } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { login, logout } from './store/auth-slice';
import { setIsLoading } from './store/global-slice';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBM1_4B6RihWj_2jMyq8bao8hXEfc2xqj0',
  authDomain: 'money-planner-bb183.firebaseapp.com',
  projectId: 'money-planner-bb183',
  storageBucket: 'money-planner-bb183.appspot.com',
  messagingSenderId: '967258468968',
  appId: '1:967258468968:web:003d84c20f1eb6ffc6c1dd',
  databaseURL:
    'https://money-planner-bb183-default-rtdb.europe-west1.firebasedatabase.app',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const logInWithEmailAndPassword = async (
  email: string,
  password: string,
  dispatch: Dispatch<AnyAction>,
  navigate: NavigateFunction
) => {
  dispatch(setIsLoading(true));
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    const token = await response.user.getIdToken();
    localStorage.setItem('authToken', token);
    dispatch(login());
    navigate('/');
  } catch (err) {
    throw new Error('Login error happened');
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const logoutUser = async (
  dispatch: Dispatch<AnyAction>,
  navigate: NavigateFunction
) => {
  localStorage.removeItem('authToken');
  dispatch(logout());
  navigate('/');
};
