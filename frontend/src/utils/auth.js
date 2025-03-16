// src/utils/auth.js
import jwtDecode from 'jwt-decode';

// Check if the user is authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime; // Check if the token is expired
  } catch (error) {
    return false;
  }
};

// Get the current user from the token
export const getCurrentUser = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.user;
  } catch (error) {
    return null;
  }
};

// Clear authentication data (logout)
export const clearAuth = () => {
  localStorage.removeItem('token');
};