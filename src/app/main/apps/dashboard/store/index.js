import { combineReducers } from '@reduxjs/toolkit';
import projects from './projectsSlice';
import widgets from './widgetsSlice';
// import dashboardReducer from './widgetsSlice1-4';

const reducer = combineReducers({
  widgets,
  projects
});

export default reducer;
