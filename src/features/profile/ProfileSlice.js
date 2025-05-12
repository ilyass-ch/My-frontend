import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProfile, updateProfile } from './ProfileAPI';

// Récupérer le profil
export const getProfile = createAsyncThunk('profile/getProfile', async (id, thunkAPI) => {
  try {
    const response = await fetchProfile(id); // Récupération du profil
    return response; // Retourne la réponse de l'API
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message); // Gestion des erreurs
  }
});

// Mettre à jour le profil
export const saveProfile = createAsyncThunk('profile/saveProfile', async ({ id, data }, thunkAPI) => {
  try {
    const response = await updateProfile(id, data); // Envoi des données mises à jour
    return response; // Retourne la réponse de l'API
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message); // Gestion des erreurs
  }
});

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    user: null, // État initial de l'utilisateur
    loading: false, // Indicateur de chargement
    error: null, // Message d'erreur
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Gestion de l'état de la requête GET
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null; // Réinitialiser l'erreur à chaque nouvelle requête
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Mise à jour de l'utilisateur avec les données récupérées
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Gérer l'erreur de récupération du profil
      })
      
      // Gestion de l'état de la requête PUT pour la mise à jour du profil
      .addCase(saveProfile.pending, (state) => {
        state.loading = true;
        state.error = null; // Réinitialiser l'erreur lors de la mise à jour
      })
      .addCase(saveProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Mise à jour des données de l'utilisateur après la mise à jour réussie
      })
      .addCase(saveProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Gérer l'erreur lors de la mise à jour
      });
  },
});

export default profileSlice.reducer;
