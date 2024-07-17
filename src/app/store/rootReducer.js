import { combineReducers } from '@reduxjs/toolkit';
import auth from 'app/auth/store';
import fuse from './fuse';
import i18n from './i18nSlice';
import dashboardReducer from '../main/apps/dashboard/store/widgetsSlice1-4';
import driverAppReducer from '../main/apps/drivers/store/DriversSlice';

const createReducer = asyncReducers => (state, action) => {
  const combinedReducer = combineReducers({
    dashboardReducer,
    auth,
    fuse,
    i18n,
    driverAppReducer,
    ...asyncReducers
  });

  /*
	Reset the redux store when user logged out
	 */
  if (action.type === 'auth/user/userLoggedOut') {
    state = undefined;
  }

  return combinedReducer(state, action);
};

export default createReducer;
