import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchProcurements = createAsyncThunk('procurement/fetchAll', async () => { return [] })
export const fetchProcurementById = createAsyncThunk('procurement/fetchById', async (id) => { return null })
export const createProcurement = createAsyncThunk('procurement/create', async (data) => { return data })
export const updateProcurement = createAsyncThunk('procurement/update', async ({ id, data }) => { return { id, ...data } })

const procurementSlice = createSlice({
  name: 'procurement',
  initialState: {
    items: [],
    selected: null,
    loading: false,
    error: null,
    pagination: { page: 0, pageSize: 10, total: 0 },
    filters: {},
  },
  reducers: {
    setFilters: (state, action) => { state.filters = action.payload },
    clearSelected: (state) => { state.selected = null },
    setPagination: (state, action) => { state.pagination = { ...state.pagination, ...action.payload } },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProcurements.pending, (state) => { state.loading = true; state.error = null })
      .addCase(fetchProcurements.fulfilled, (state, action) => { state.loading = false; state.items = action.payload })
      .addCase(fetchProcurements.rejected, (state, action) => { state.loading = false; state.error = action.error.message })
      .addCase(fetchProcurementById.fulfilled, (state, action) => { state.selected = action.payload })
      .addCase(createProcurement.fulfilled, (state, action) => { state.items.unshift(action.payload) })
      .addCase(updateProcurement.fulfilled, (state, action) => {
        const idx = state.items.findIndex((i) => i.id === action.payload.id)
        if (idx !== -1) state.items[idx] = action.payload
      })
  },
})

export const { setFilters, clearSelected, setPagination } = procurementSlice.actions
export default procurementSlice.reducer
