import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchDashboardData = createAsyncThunk('dashboard/fetchData', async () => {
  return {}
})

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: { data: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => { state.loading = true; state.error = null })
      .addCase(fetchDashboardData.fulfilled, (state, action) => { state.loading = false; state.data = action.payload })
      .addCase(fetchDashboardData.rejected, (state, action) => { state.loading = false; state.error = action.error.message })
  },
})

export default dashboardSlice.reducer
