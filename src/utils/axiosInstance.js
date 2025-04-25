import axios from 'axios';

// Récupère l'URL de l'API depuis les variables d'environnement
const API_URL = process.env.REACT_APP_API_URL;

// Crée une instance Axios
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    // Ajoute d'autres headers si nécessaire
  },
});

// Ajouter un interceptor pour gérer les erreurs globalement
axiosInstance.interceptors.response.use(
  response => response, // Retourne directement la réponse si tout va bien
  error => {
    // Gère les erreurs globales ici, par exemple pour les erreurs 401 ou 500
    if (error.response && error.response.status === 401) {
      // Rediriger ou gérer l'authentification si nécessaire
    } else {
      console.error('Erreur Axios:', error.response || error.message);
    }
    return Promise.reject(error); // Propager l'erreur
  }
);

export default axiosInstance;
