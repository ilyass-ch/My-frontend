// src/features/profile/profileAPI.js
import axiosClient from '../../api/axiosClient';

// Récupération dynamique de l'id utilisateur
export const fetchProfile = async (id) => {
  const response = await axiosClient.get(`/users/${id}`);
  return response.data;
};

export const updateProfile = async (id, profileData) => {
  const response = await axiosClient.put(`/users/${id}`, profileData);
  return response.data;
};
