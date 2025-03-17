import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

// ✅ Register Thunk
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      console.log("🔄 Registering...");
      const response = await api.post('/auth/register', userData, { withCredentials: true });
      console.log("✅ Registration Success:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Registration Error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

// ✅ Login Thunk
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      console.log("🔄 Logging in...");
      const response = await api.post('/auth/login', { email, password }, { withCredentials: true });
      console.log("✅ Login Success:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Login Error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

// ✅ Logout Thunk
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      console.log("🔄 Logging out...");
      await api.post('/auth/logout', {}, { withCredentials: true });
      console.log("✅ Logout Success!");
      return {}; // No need to return data, just clear state
    } catch (error) {
      console.error("❌ Logout Error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || 'Logout failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ Handle Register
      .addCase(registerUser.pending, (state) => {
        console.log("🔄 Registering...");
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        console.log("✅ Register Fulfilled!", action.payload);
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        console.log("❌ Register Rejected!", action.payload);
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Handle Login
      .addCase(loginUser.pending, (state) => {
        console.log("🔄 Logging in...");
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("✅ Login Fulfilled!", action.payload);
        state.loading = false;
        state.user = action.payload.user; // Ensure user is stored
        state.isAuthenticated = !!action.payload.user; // Correctly set auth state
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log("❌ Login Rejected!", action.payload);
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Handle Logout
      .addCase(logoutUser.fulfilled, (state) => {
        console.log("✅ State cleared after logout");
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;
