import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchAuditReports = createAsyncThunk('audit/fetchReports', async () => { return [] })
export const fetchAuditHistory = createAsyncThunk('audit/fetchHistory', async () => { return [] })
export const fetchSystemLogs = createAsyncThunk('audit/fetchLogs', async () => { return [] })
export const fetchUserActivities = createAsyncThunk('audit/fetchActivities', async () => { return [] })

const auditSlice = createSlice({
  name: 'audit',
  initialState: {
    reports: [],
    history: [],
    systemLogs: [],
    userActivities: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearAuditError: (state) => { state.error = null },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuditReports.pending, (state) => { state.loading = true; state.error = null })
      .addCase(fetchAuditReports.fulfilled, (state, action) => { state.loading = false; state.reports = action.payload })
      .addCase(fetchAuditReports.rejected, (state, action) => { state.loading = false; state.error = action.error.message })
      .addCase(fetchAuditHistory.fulfilled, (state, action) => { state.history = action.payload })
      .addCase(fetchSystemLogs.fulfilled, (state, action) => { state.systemLogs = action.payload })
      .addCase(fetchUserActivities.fulfilled, (state, action) => { state.userActivities = action.payload })
  },
})

export const { clearAuditError } = auditSlice.actions
export default auditSlice.reducer
