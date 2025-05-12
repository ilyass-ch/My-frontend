// import axios from 'axios';
import axiosClient from '../../api/axiosClient.js'; // Assurez-vous que le chemin est correct


// const API_URL = '/products'; // adapte si besoin

const getAllProducts = async () => {
  const response = await axiosClient.get(`/produits`);
  return response.data;
};

const createProduct = async (product) => {
  const response = await axiosClient.post(`/produits`, product);
  return response.data;
};

const updateProduct = async (id, product) => {
  const response = await axiosClient.put(`/produits/${id}`, product);
  return response.data;
};

const deleteProduct = async (id) => {
  await axiosClient.delete(`/produits/${id}`);
  return id;
};

const productAPI = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};

export default productAPI;
