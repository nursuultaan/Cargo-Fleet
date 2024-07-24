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

export const deleteDriver = createAsyncThunk('vehiclesApp/drivers/deleteDriver', async (driverId) => {
  try {
    await axios.delete(`https://cargofleet-api.fly.dev/team1/api/drivers/${driverId}`, {
      headers: {
        Authorization: 'Zb84MzAROCrhmF6t'
      }
    });
    return driverId;
  } catch (error) {
    console.error('Error deleting driver:', error);
    throw error;
  }
});


const driversSlice = createSlice({
  name: 'vehiclesApp/drivers',
  initialState: { error: null, data: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDriversData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = false;
      })
      .addCase(getDriversData.rejected, (state, action) => {
        state.error = true;
      })
      .addCase(deleteDriver.fulfilled, (state, action) => {
        state.data = state.data.filter(driver => driver.id !== action.payload);
      })
      .addCase(deleteDriver.rejected, (state, action) => {
        state.error = true;
      })
  }
});

export const selectDrivers = state => state.driverAppReducer.data;

export default driversSlice.reducer;
