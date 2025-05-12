import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import login from './LoginAPI'; // Vérifie que login est bien une fonction asynchrone qui retourne un objet avec user, access-token, refresh-token

// État initial
const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  accessToken: localStorage.getItem('accessToken') || null,
  refreshToken: localStorage.getItem('refreshToken') || null,
  loading: false,
  error: null,
};

// Thunk pour la connexion
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await login(credentials);

      if (!data['access-token'] || !data['refresh-token'] || !data.user) {
        return rejectWithValue('Réponse API invalide : token ou user manquant');
      }

      // Stockage des tokens et de l'utilisateur dans localStorage
      localStorage.setItem('accessToken', data['access-token']);
      localStorage.setItem('refreshToken', data['refresh-token']);
      localStorage.setItem('user', JSON.stringify(data.user));

      return {
        user: data.user,
        accessToken: data['access-token'],
        refreshToken: data['refresh-token'],
      };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message || 'Une erreur est survenue'
      );
    }
  }
);

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export des actions et du reducer
export const { logout } = authSlice.actions;
export default authSlice.reducer;
