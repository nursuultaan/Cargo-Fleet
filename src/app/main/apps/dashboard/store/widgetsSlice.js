import { createEntityAdapter, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

async function getIP() {
  const res = await axios.get('https://api.ipify.org');
  return res.data;
}

async function getLocationByIP() {
  const ip = await getIP();
  const locationData = await axios.get(`https://ipinfo.io/${ip}?token=1ef1055fb92fa6`);
  return locationData.data;
}

async function getCityWeather() {
  const ip = await getIP();
  const location = await getLocationByIP();
  console.log(location);
  const res = await axios.get(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location.city.capitalize()}?unitGroup=metric&key=XGBEDGJ87QKB94WDUSDZ7MCBJ&contentType=json`
  );
  console.log("Weather :",res);
  const weatherData = await res.data;
  return "W";
}

export const getWidgets = createAsyncThunk('projectDashboardApp/widgets/getWidgets', async () => {
  const response = await axios.get('/api/project-dashboard-app/widgets');
  const data = await response.data;

  console.log(await getCityWeather());

  return data;
});

const widgetsAdapter = createEntityAdapter({});

export const { selectEntities: selectWidgets, selectById: selectWidgetById } = widgetsAdapter.getSelectors(
  state => state.projectDashboardApp.widgets
);

const widgetsSlice = createSlice({
  name: 'projectDashboardApp/widgets',
  initialState: widgetsAdapter.getInitialState(),
  reducers: {},
  extraReducers: {
    [getWidgets.fulfilled]: widgetsAdapter.setAll
  }
});

export default widgetsSlice.reducer;
