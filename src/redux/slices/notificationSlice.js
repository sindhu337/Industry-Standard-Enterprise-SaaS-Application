import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import notificationsData from '@/mocks/notifications.json'

const simulateDelay = (ms = 600) => new Promise((res) => setTimeout(res, ms))

export const fetchNotifications = createAsyncThunk('notifications/fetchAll', async () => {
  await simulateDelay()
  return notificationsData
})

export const markAsRead = createAsyncThunk('notifications/markAsRead', async (id) => {
  await simulateDelay(300)
  return id
})

export const markAllAsRead = createAsyncThunk('notifications/markAllAsRead', async () => {
  await simulateDelay(300)
  return true
})

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => { state.loading = true })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(markAsRead.fulfilled, (state, action) => {
        const n = state.items.find((i) => i.id === action.payload)
        if (n) n.isRead = true
      })
      .addCase(markAllAsRead.fulfilled, (state) => {
        state.items.forEach((i) => { i.isRead = true })
      })
  },
})

export default notificationSlice.reducer
