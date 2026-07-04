import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchVendors = createAsyncThunk('vendors/fetchAll', async () => { return [] })
export const fetchVendorById = createAsyncThunk('vendors/fetchById', async (id) => { return null })
export const createVendor = createAsyncThunk('vendors/create', async (data) => { return data })
export const updateVendor = createAsyncThunk('vendors/update', async ({ id, data }) => { return { id, ...data } })

const vendorSlice = createSlice({
  name: 'vendors',
  initialState: {
    items: [],
    selected: null,
    loading: false,
    error: null,
    filters: {},
  },
  reducers: {
    setVendorFilters: (state, action) => { state.filters = action.payload },
    clearSelectedVendor: (state) => { state.selected = null },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVendors.pending, (state) => { state.loading = true; state.error = null })
      .addCase(fetchVendors.fulfilled, (state, action) => { state.loading = false; state.items = action.payload })
      .addCase(fetchVendors.rejected, (state, action) => { state.loading = false; state.error = action.error.message })
      .addCase(fetchVendorById.fulfilled, (state, action) => { state.selected = action.payload })
      .addCase(createVendor.fulfilled, (state, action) => { state.items.unshift(action.payload) })
      .addCase(updateVendor.fulfilled, (state, action) => {
        const idx = state.items.findIndex((i) => i.id === action.payload.id)
        if (idx !== -1) state.items[idx] = action.payload
      })
  },
})

export const { setVendorFilters, clearSelectedVendor } = vendorSlice.actions
export default vendorSlice.reducer
