import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Change to your backend URL
  withCredentials: true, // Ensure cookies are sent
});

export default api;
