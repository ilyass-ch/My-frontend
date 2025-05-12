import { combineReducers } from 'redux';
import authReducer from '../features/auth/login/LoginSlice';
import registerReducer from '../features/auth/register/registerSlice';
import profileReducer from '../features/profile/ProfileSlice'; // Ajoute ici le profileSlice
import productReducer from '../features/products/productSlice'; // Ajoute ici le productSlice

// Ajoute d'autres reducers ici...

const rootReducer = combineReducers({
  auth: authReducer,
  register: registerReducer,
  profile: profileReducer, // Ajouter le profileReducer ici
  products: productReducer, // Ajouter le productReducer ici
  // users: userReducer,
  // etc.
});

export default rootReducer;
