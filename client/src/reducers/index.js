import { combineReducers } from 'redux';
import userReducer from './userReducer';
import authReducer from './authReducer';
import persistReducer from './persistReducer';
import credentialReducer from './credentialReducer';

export default combineReducers({
  users: userReducer,
  auth: authReducer,
  credential: credentialReducer
});
