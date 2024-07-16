import { combineReducers } from '@reduxjs/toolkit';
import vehicles from './vehiclesSlice';
import vehicle from './vehicleSlice';
import user from './userSlice';

const reducer = combineReducers({
  vehicles,
  vehicle,
  user
});

export default reducer;
