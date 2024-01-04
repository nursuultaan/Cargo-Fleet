import { combineReducers } from '@reduxjs/toolkit';
import vehicles from './vehiclesSlice';
import user from './userSlice';

const reducer = combineReducers({
  vehicles,
  user
});

export default reducer;
