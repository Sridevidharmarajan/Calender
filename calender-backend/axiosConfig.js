// axiosConfig.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api', // Adjust baseURL to match your server setup
});

export default axiosInstance;
