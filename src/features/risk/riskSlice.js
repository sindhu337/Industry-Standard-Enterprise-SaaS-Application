import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchRisks = createAsyncThunk('risk/fetchAll', async () => { return [] })
export const fetchRiskSummary = createAsyncThunk('risk/fetchSummary', async () => { return {} })
export const createRisk = createAsyncThunk('risk/create', async (data) => { return data })
export const updateRisk = createAsyncThunk('risk/update', async ({ id, data }) => { return { id, ...data } })

const riskSlice = createSlice({
  name: 'risk',
  initialState: {
    items: [],
    summary: null,
    trendData: [],
    categoryBreakdown: [],
    loading: false,
    error: null,
    filters: {},
  },
  reducers: {
    setRiskFilters: (state, action) => { state.filters = action.payload },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRisks.pending, (state) => { state.loading = true; state.error = null })
      .addCase(fetchRisks.fulfilled, (state, action) => { state.loading = false; state.items = action.payload })
      .addCase(fetchRisks.rejected, (state, action) => { state.loading = false; state.error = action.error.message })
      .addCase(fetchRiskSummary.fulfilled, (state, action) => { state.summary = action.payload })
      .addCase(createRisk.fulfilled, (state, action) => { state.items.unshift(action.payload) })
      .addCase(updateRisk.fulfilled, (state, action) => {
        const idx = state.items.findIndex((i) => i.id === action.payload.id)
        if (idx !== -1) state.items[idx] = action.payload
      })
  },
})

export const { setRiskFilters } = riskSlice.actions
export default riskSlice.reducer
