import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchComplianceData = createAsyncThunk('compliance/fetchAll', async () => { return [] })
export const fetchViolations = createAsyncThunk('compliance/fetchViolations', async () => { return [] })
export const fetchExpiredCertificates = createAsyncThunk('compliance/fetchExpired', async () => { return [] })

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
      .addCase(fetchComplianceData.fulfilled, (state, action) => { state.loading = false; state.items = action.payload })
      .addCase(fetchComplianceData.rejected, (state, action) => { state.loading = false; state.error = action.error.message })
      .addCase(fetchViolations.fulfilled, (state, action) => { state.violations = action.payload })
      .addCase(fetchExpiredCertificates.fulfilled, (state, action) => { state.expiredCertificates = action.payload })
  },
})

export const { clearComplianceError } = complianceSlice.actions
export default complianceSlice.reducer
