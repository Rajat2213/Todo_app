import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

// ✅ Register Thunk
export const register = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
  try {
    const response = await api.post('/auth/register', userData, { withCredentials: true });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Registration failed');
  }
});

// ✅ Login Thunk
export const login = createAsyncThunk('auth/login', async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await api.post('/auth/login', { email, password }, { withCredentials: true });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Login failed');
  }
});

// ✅ Logout Thunk
export const logoutUser = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await api.post('/auth/logout', {}, { withCredentials: true });
  } catch (error) {
    return rejectWithValue('Logout failed');
  }
});
