import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const VEHICLES_API = 'https://cargofleet-api.fly.dev/team1/api/vehicles';
const TOKEN = 'Zb84MzAROCrhmF6t';

export const getVehicle = createAsyncThunk('vehiclesApp/vehicles/getVehicle', async ({ id }) => {
  const response = await axios.get(`${VEHICLES_API}/${id}`, {
    headers: {
      Authorization: TOKEN
    }
  });
  return response.data;
});

const vehicleSlice = createSlice({
  name: 'vehiclesApp/vehicle',
  initialState: {
    selectedVehicle: null
  },
  reducers: {},
  extraReducers: {
    [getVehicle.fulfilled]: (state, action) => {
      state.selectedVehicle = action.payload;
    }
  }
});
export const vehicleInfo = state => state.vehiclesApp?.vehicle.selectedVehicle;

export default vehicleSlice.reducer;
