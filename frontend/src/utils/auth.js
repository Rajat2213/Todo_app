import axios from 'axios';

// ✅ Check if the user is authenticated (using cookies)
export const isAuthenticated = () => {
  return document.cookie.split('; ').some(row => row.startsWith('token='));
};

// ✅ Get the current user by requesting the backend
export const getCurrentUser = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/auth/me', {
      withCredentials: true, // Important for sending cookies
    });
    return response.data; 
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return null;
  }
};

// ✅ Logout: Clear authentication cookie & refresh page
export const clearAuth = () => {
  document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 UTC;';
  window.location.reload();
};
