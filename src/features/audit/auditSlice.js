import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { AUDIT_MOCK_DATA, AUDIT_SUMMARY, SYSTEM_LOGS_DATA, USER_ACTIVITY_DATA } from './data/auditMockData'

const delay = (ms = 400) => new Promise((res) => setTimeout(res, ms))

export const fetchAuditReports = createAsyncThunk('audit/fetchReports', async (_, { getState }) => {
  await delay()
  const { audit } = getState()
  if (audit.reports.length > 0) return audit.reports
  return AUDIT_MOCK_DATA
})

export const fetchAuditHistory = createAsyncThunk('audit/fetchHistory', async () => {
  await delay(200)
  return AUDIT_SUMMARY
})

export const fetchSystemLogs = createAsyncThunk('audit/fetchLogs', async () => {
  await delay(300)
  return SYSTEM_LOGS_DATA
})

export const fetchUserActivities = createAsyncThunk('audit/fetchActivities', async () => {
  await delay(300)
  return USER_ACTIVITY_DATA
})

const auditSlice = createSlice({
  name: 'audit',
  initialState: {
    reports: [],
    history: [],
    systemLogs: [],
    userActivities: [],
    summary: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearAuditError: (state) => { state.error = null },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuditReports.pending, (state) => { state.loading = true; state.error = null })
      .addCase(fetchAuditReports.fulfilled, (state, action) => {
        state.loading = false
        state.reports = action.payload
      })
      .addCase(fetchAuditReports.rejected, (state, action) => {
        state.loading = false; state.error = action.error.message
      })
      .addCase(fetchAuditHistory.fulfilled, (state, action) => {
        state.summary = action.payload
      })
      .addCase(fetchSystemLogs.fulfilled, (state, action) => {
        state.systemLogs = action.payload
      })
      .addCase(fetchUserActivities.fulfilled, (state, action) => {
        state.userActivities = action.payload
      })
  },
})

export const { clearAuditError } = auditSlice.actions
export default auditSlice.reducer
