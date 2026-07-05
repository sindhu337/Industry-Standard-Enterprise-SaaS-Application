import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RISK_MOCK_DATA, RISK_SUMMARY, RISK_TREND_DATA, RISK_CATEGORY_BREAKDOWN } from './data/riskMockData'

const delay = (ms = 400) => new Promise((res) => setTimeout(res, ms))

export const fetchRisks = createAsyncThunk('risk/fetchAll', async (_, { getState }) => {
  await delay()
  const { risk } = getState()
  return risk.items.length > 0 ? risk.items : RISK_MOCK_DATA
})

export const fetchRiskSummary = createAsyncThunk('risk/fetchSummary', async () => {
  await delay(200)
  return { summary: RISK_SUMMARY, trendData: RISK_TREND_DATA, categoryBreakdown: RISK_CATEGORY_BREAKDOWN }
})

export const createRisk = createAsyncThunk('risk/create', async (data) => {
  await delay(400)
  return { id: `RK-${String(Date.now()).slice(-3)}`, score: data.probability * data.impact, ...data }
})

export const updateRisk = createAsyncThunk('risk/update', async ({ id, data }) => {
  await delay(300)
  return { id, score: data.probability * data.impact, ...data }
})

const riskSlice = createSlice({
  name: 'risk',
  initialState: {
    items: [],
    summary: null,
    trendData: [],
    categoryBreakdown: [],
    loading: false,
    error: null,
    filters: { search: '', level: 'All', status: 'All', category: 'All' },
  },
  reducers: {
    setRiskFilters: (state, action) => { state.filters = { ...state.filters, ...action.payload } },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRisks.pending, (state) => { state.loading = true; state.error = null })
      .addCase(fetchRisks.fulfilled, (state, action) => { state.loading = false; state.items = action.payload })
      .addCase(fetchRisks.rejected, (state, action) => { state.loading = false; state.error = action.error.message })
      .addCase(fetchRiskSummary.fulfilled, (state, action) => {
        state.summary = action.payload.summary
        state.trendData = action.payload.trendData
        state.categoryBreakdown = action.payload.categoryBreakdown
      })
      .addCase(createRisk.fulfilled, (state, action) => { state.items.unshift(action.payload) })
      .addCase(updateRisk.fulfilled, (state, action) => {
        const idx = state.items.findIndex((i) => i.id === action.payload.id)
        if (idx !== -1) state.items[idx] = action.payload
      })
  },
})

export const { setRiskFilters } = riskSlice.actions
export default riskSlice.reducer
