import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getDriversData = createAsyncThunk('vehiclesApp/drivers/getDriversData', async () => {
  try {
    const response = await axios.get('https://cargofleet-api.fly.dev/team1/api/drivers/', {
      headers: {
        Authorization: 'Zb84MzAROCrhmF6t'
      }
    });
    return response.data.data; // Assuming response.data has a `data` field with array of drivers
  } catch (error) {
    console.error('Error fetching drivers data:', error);
    throw error; // Propagate the error
  }
});

const driversSlice = createSlice({
  name: 'vehiclesApp/drivers',
  initialState: { error: null, data: [] },
  reducers: {},
  extraReducers: {
    [getDriversData.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.error = false;
    },
    [getDriversData.rejected]: (state, action) => {
      state.error = true;
    }
  }
});

export const selectDrivers = state => state.driverAppReducer.data;

export default driversSlice.reducer;
