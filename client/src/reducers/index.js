import { combineReducers } from 'redux';
import userReducer from './userReducer';
import authReducer from './authReducer';
import persistReducer from './persistReducer';

export default combineReducers({
  users: userReducer,
  auth: authReducer,
  persist: persistReducer
});
