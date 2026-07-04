import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import users from '@/mocks/users.json'

const simulateDelay = (ms = 800) => new Promise((res) => setTimeout(res, ms))

const generateToken = (userId) => `mock-jwt-${userId}-${Date.now()}`

export const loginUser = createAsyncThunk('auth/login', async ({ email, password }, { rejectWithValue }) => {
  await simulateDelay()
  const user = users.find((u) => u.email === email && u.password === password)
  if (!user) return rejectWithValue('Invalid email or password.')
  const { password: _, ...safeUser } = user
  return { user: safeUser, token: generateToken(user.id) }
})

export const registerUser = createAsyncThunk('auth/register', async (formData, { rejectWithValue }) => {
  await simulateDelay()
  const exists = users.find((u) => u.email === formData.email)
  if (exists) return rejectWithValue('An account with this email already exists.')
  const newUser = {
    id: `u${Date.now()}`,
    name: formData.name,
    email: formData.email,
    role: 'Employee',
    department: 'General',
    status: 'Active',
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
  }
  return { user: newUser, token: generateToken(newUser.id) }
})

export const forgotPassword = createAsyncThunk('auth/forgotPassword', async ({ email }, { rejectWithValue }) => {
  await simulateDelay()
  const user = users.find((u) => u.email === email)
  if (!user) return rejectWithValue('No account found with this email address.')
  return { message: 'Password reset link sent to your email.' }
})

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  successMessage: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => initialState,
    clearError: (state) => { state.error = null },
    clearSuccess: (state) => { state.successMessage = null },
    updateProfile: (state, action) => {
      if (state.user) state.user = { ...state.user, ...action.payload }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => { state.loading = true; state.error = null })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(registerUser.pending, (state) => { state.loading = true; state.error = null })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(forgotPassword.pending, (state) => { state.loading = true; state.error = null; state.successMessage = null })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false
        state.successMessage = action.payload.message
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { logout, clearError, clearSuccess, updateProfile } = authSlice.actions
export default authSlice.reducer
