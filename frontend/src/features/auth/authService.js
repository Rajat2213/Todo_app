// src/features/auth/authService.js
import axios from 'axios';
import { setCredentials, logout } from './authSlice';
import { toast } from 'react-toastify';

const API_URL = 'http://localhost:5000/api/auth';

// Register user
export const register = (userData) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    const { user, token } = response.data;
    dispatch(setCredentials({ user, token }));
    localStorage.setItem('token', token);
    toast.success('Registered successfully!');
  } catch (error) {
    toast.error('Registration failed');
    console.error('Registration failed:', error);
  }
};

// Login user
export const login = (email, password) => async (dispatch) => {
  try {
    // Step 1: Check if the user exists in the database
    const checkUserResponse = await axios.get(`${API_URL}/check-user`, {
      params: { email },
    });

    if (!checkUserResponse.data.exists) {
      toast.error('User does not exist');
      return;
    }

    // Step 2: Proceed with login if the user exists
    const loginResponse = await axios.post(`${API_URL}/login`, { email, password });
    const { user, token } = loginResponse.data;

    // Step 3: Dispatch credentials and store token
    dispatch(setCredentials({ user, token }));
    localStorage.setItem('token', token);
    toast.success('Logged in successfully!');
  } catch (error) {
    toast.error('Login failed');
    console.error('Login failed:', error);
  }
};

// Logout user
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch(logout());
  toast.success('Logged out successfully!');
};