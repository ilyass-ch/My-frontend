import { combineReducers } from 'redux';
import authReducer from '../features/auth/login/LoginSlice';
import registerReducer from '../features/auth/register/registerSlice';
// import userReducer from '../features/users/userSlice.js';
// Ajoute d'autres reducers ici...

const rootReducer = combineReducers({
  login: authReducer,
  register: registerReducer,
  // users: userReducer,
  // etc.
});

export default rootReducer;
