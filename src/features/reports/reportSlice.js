import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchReports = createAsyncThunk('reports/fetchAll', async () => { return [] })
export const fetchSavedReports = createAsyncThunk('reports/fetchSaved', async () => { return [] })
export const saveReport = createAsyncThunk('reports/save', async (report) => { return report })
export const deleteReport = createAsyncThunk('reports/delete', async (id) => { return id })

const reportSlice = createSlice({
  name: 'reports',
  initialState: {
    items: [],
    savedReports: [],
    activeReport: null,
    loading: false,
    error: null,
    exportLoading: false,
  },
  reducers: {
    setActiveReport: (state, action) => { state.activeReport = action.payload },
    clearActiveReport: (state) => { state.activeReport = null },
    setExportLoading: (state, action) => { state.exportLoading = action.payload },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReports.pending, (state) => { state.loading = true; state.error = null })
      .addCase(fetchReports.fulfilled, (state, action) => { state.loading = false; state.items = action.payload })
      .addCase(fetchReports.rejected, (state, action) => { state.loading = false; state.error = action.error.message })
      .addCase(fetchSavedReports.fulfilled, (state, action) => { state.savedReports = action.payload })
      .addCase(saveReport.fulfilled, (state, action) => { state.savedReports.unshift(action.payload) })
      .addCase(deleteReport.fulfilled, (state, action) => {
        state.savedReports = state.savedReports.filter((r) => r.id !== action.payload)
      })
  },
})

export const { setActiveReport, clearActiveReport, setExportLoading } = reportSlice.actions
export default reportSlice.reducer
