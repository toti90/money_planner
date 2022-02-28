import { AnyAction } from '@reduxjs/toolkit';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { Dispatch } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { login, logout } from './store/auth-slice';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBM1_4B6RihWj_2jMyq8bao8hXEfc2xqj0',
  authDomain: 'money-planner-bb183.firebaseapp.com',
  projectId: 'money-planner-bb183',
  storageBucket: 'money-planner-bb183.appspot.com',
  messagingSenderId: '967258468968',
  appId: '1:967258468968:web:003d84c20f1eb6ffc6c1dd',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export const logInWithEmailAndPassword = async (
  email: string,
  password: string,
  dispatch: Dispatch<AnyAction>,
  navigate: NavigateFunction
) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    const token = await response.user.getIdToken();
    localStorage.setItem('authToken', token);
    dispatch(login());
    navigate('/');
  } catch (err) {
    console.error(err);
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
