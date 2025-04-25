// src/features/auth/authAPI.js
import axiosClient from '../../../api/axiosClient';

const LoginAPI = async (credentials) => { 
  const response = await axiosClient.post('/users/login', credentials);
  return response.data;
};

export default LoginAPI;
