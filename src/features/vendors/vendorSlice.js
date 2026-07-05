import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { VENDOR_MOCK_DATA } from './data/vendorMockData'

const delay = (ms = 400) => new Promise((res) => setTimeout(res, ms))

export const fetchVendors = createAsyncThunk('vendors/fetchAll', async (_, { getState }) => {
  await delay()
  const { vendors } = getState()
  if (vendors.items.length > 0) return vendors.items
  return VENDOR_MOCK_DATA
})

export const fetchVendorById = createAsyncThunk('vendors/fetchById', async (id, { getState }) => {
  await delay(200)
  const { vendors } = getState()
  const items = vendors.items.length > 0 ? vendors.items : VENDOR_MOCK_DATA
  return items.find((v) => v.id === id) || null
})

export const createVendor = createAsyncThunk('vendors/create', async (data) => {
  await delay(500)
  return { id: `v${Date.now()}`, ...data }
})

export const updateVendor = createAsyncThunk('vendors/update', async ({ id, data }) => {
  await delay(400)
  return { id, ...data }
})

const vendorSlice = createSlice({
  name: 'vendors',
  initialState: {
    items: [],
    selected: null,
    loading: false,
    error: null,
    filters: { search: '', status: 'All', riskLevel: 'All', category: 'All' },
  },
  reducers: {
    setVendorFilters: (state, action) => { state.filters = { ...state.filters, ...action.payload } },
    clearSelectedVendor: (state) => { state.selected = null },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVendors.pending, (state) => { state.loading = true; state.error = null })
      .addCase(fetchVendors.fulfilled, (state, action) => { state.loading = false; state.items = action.payload })
      .addCase(fetchVendors.rejected, (state, action) => { state.loading = false; state.error = action.error.message })
      .addCase(fetchVendorById.pending, (state) => { state.loading = true })
      .addCase(fetchVendorById.fulfilled, (state, action) => { state.loading = false; state.selected = action.payload })
      .addCase(createVendor.fulfilled, (state, action) => { state.items.unshift(action.payload) })
      .addCase(updateVendor.fulfilled, (state, action) => {
        const idx = state.items.findIndex((i) => i.id === action.payload.id)
        if (idx !== -1) state.items[idx] = action.payload
        if (state.selected?.id === action.payload.id) state.selected = action.payload
      })
  },
})

export const { setVendorFilters, clearSelectedVendor } = vendorSlice.actions
export default vendorSlice.reducer
