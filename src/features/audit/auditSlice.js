import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import { AUDIT_MOCK_DATA, AUDIT_SUMMARY, SYSTEM_LOGS_DATA, USER_ACTIVITY_DATA } from './data/auditMockData'
import { PROCUREMENT_MOCK_DATA } from '@/features/procurement/data/procurementMockData'

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

export const loadAuditorQueue = createAsyncThunk('audit/loadQueue', async () => {
  await delay(200)
  return PROCUREMENT_MOCK_DATA.filter((item) => item.status === 'Approved' && item.complianceStatus === 'Compliant').map((item) => ({
    ...item,
    auditStatus: 'Pending Audit',
    observations: [],
    auditDate: null,
    auditedBy: null,
  }))
})

export const markAuditItemAudited = createAction('audit/markAudited', ({ id, auditedBy, auditDate }) => ({ payload: { id, auditedBy, auditDate } }))

export const addAuditObservation = createAction('audit/addObservation', ({ id, observation, auditorName, auditDate }) => ({ payload: { id, observation, auditorName, auditDate } }))

const auditSlice = createSlice({
  name: 'audit',
  initialState: {
    reports: [],
    history: [],
    systemLogs: [],
    userActivities: [],
    queue: [],
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
      .addCase(loadAuditorQueue.fulfilled, (state, action) => {
        state.queue = action.payload
      })
      .addCase(markAuditItemAudited, (state, action) => {
        const item = state.queue.find((entry) => entry.id === action.payload.id)
        if (item) {
          item.auditStatus = 'Audited'
          item.auditedBy = action.payload.auditedBy
          item.auditDate = action.payload.auditDate
        }
      })
      .addCase(addAuditObservation, (state, action) => {
        const item = state.queue.find((entry) => entry.id === action.payload.id)
        if (item) {
          item.auditStatus = 'Observation Raised'
          item.observations = [
            ...(item.observations || []),
            {
              observation: action.payload.observation,
              auditorName: action.payload.auditorName,
              auditDate: action.payload.auditDate,
            },
          ]
        }
      })
  },
})

export const { clearAuditError } = auditSlice.actions
export default auditSlice.reducer
