import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const datApi = 'https://cargofleet-api.fly.dev/team1/api/dashboard';
const Token = ' Zb84MzAROCrhmF6t';

// function fetch() {
//   axios
//     .get(datApi, {
//       headers: {
//         Authorization: Token
//       }
//     })
//     .then(res => console.log(res.data));
// }
// fetch();
export const fetchDashboardData = createAsyncThunk('dashboard/fetchData', async () => {
  const response = await axios.get(datApi, {
    headers: {
      Authorization: Token
    }
  });

  return response.data;
});

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    data: {},
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchDashboardData.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default dashboardSlice.reducer;
