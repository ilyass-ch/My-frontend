import { combineReducers } from 'redux';
import authReducer from '../features/auth/login/LoginSlice';
import registerReducer from '../features/auth/register/registerSlice';
import profileReducer from '../features/profile/ProfileSlice'; // Ajoute ici le profileSlice

// Ajoute d'autres reducers ici...

const rootReducer = combineReducers({
  login: authReducer,
  register: registerReducer,
  profile: profileReducer, // Ajouter le profileReducer ici
  // users: userReducer,
  // etc.
});

export default rootReducer;
