import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { COMPLIANCE_MOCK_DATA, VIOLATIONS_MOCK_DATA, COMPLIANCE_SUMMARY } from './data/complianceMockData'

const delay = (ms = 400) => new Promise((res) => setTimeout(res, ms))

export const fetchComplianceData = createAsyncThunk('compliance/fetchAll', async (_, { getState }) => {
  await delay()
  const { compliance } = getState()
  if (compliance.items.length > 0) return { items: compliance.items, summary: compliance.summary }
  return { items: COMPLIANCE_MOCK_DATA, summary: COMPLIANCE_SUMMARY }
})

export const fetchViolations = createAsyncThunk('compliance/fetchViolations', async () => {
  await delay(200)
  return VIOLATIONS_MOCK_DATA
})

export const fetchExpiredCertificates = createAsyncThunk('compliance/fetchExpired', async () => {
  await delay(200)
  return COMPLIANCE_MOCK_DATA.filter((c) => c.status === 'Expired')
})

const complianceSlice = createSlice({
  name: 'compliance',
  initialState: {
    items: [],
    violations: [],
    expiredCertificates: [],
    missingDocuments: [],
    summary: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearComplianceError: (state) => { state.error = null },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComplianceData.pending, (state) => { state.loading = true; state.error = null })
      .addCase(fetchComplianceData.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload.items
        state.summary = action.payload.summary
      })
      .addCase(fetchComplianceData.rejected, (state, action) => {
        state.loading = false; state.error = action.error.message
      })
      .addCase(fetchViolations.fulfilled, (state, action) => { state.violations = action.payload })
      .addCase(fetchExpiredCertificates.fulfilled, (state, action) => { state.expiredCertificates = action.payload })
  },
})

export const { clearComplianceError } = complianceSlice.actions
export default complianceSlice.reducer
