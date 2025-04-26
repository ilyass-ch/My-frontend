// src/features/profile/profileSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProfile, updateProfile } from './ProfileAPI';

// Récupérer le profil
export const getProfile = createAsyncThunk('profile/getProfile', async (id, thunkAPI) => {
  try {
    const response = await fetchProfile(id); // Utilisation de l'id pour récupérer le profil
    return response; // Assure-toi que la réponse est bien celle attendue
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message); // Gérer les erreurs
  }
});

// Mettre à jour le profil
export const saveProfile = createAsyncThunk('profile/saveProfile', async ({ id, data }, thunkAPI) => {
  try {
    const response = await updateProfile(id, data); // Envoi des données à l'API
    return response; // Retourne la réponse si tout va bien
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message); // Gérer les erreurs
  }
});

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
      user: null, // L'état initial de l'utilisateur
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getProfile.pending, (state) => {
          state.loading = true;
        })
        .addCase(getProfile.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload;
        })
        .addCase(getProfile.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(saveProfile.fulfilled, (state, action) => {
          state.user = action.payload;
        });
    },
  });
  
  export default profileSlice.reducer;
  

