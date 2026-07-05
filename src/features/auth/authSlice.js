import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import users from '@/mocks/users.json'
import { ROLES } from '@/constants/roles'

const simulateDelay = (ms = 800) => new Promise((res) => setTimeout(res, ms))
const generateToken = (userId) => `mock-jwt-${userId}-${Date.now()}`

const getMergedUsers = () => {
  try {
    const localUsers = JSON.parse(localStorage.getItem('egrcp_registered_users') || '[]')
    return [...users, ...localUsers]
  } catch {
    return users
  }
}

export const loginUser = createAsyncThunk('auth/login', async ({ email, password }, { rejectWithValue }) => {
  await simulateDelay()
  const emailNormalized = email.trim().toLowerCase()
  const merged = getMergedUsers()
  
  const user = merged.find((u) => u.email.trim().toLowerCase() === emailNormalized && u.password === password)
  if (!user) return rejectWithValue('Invalid email or password.')
  
  const { password: _, ...safeUser } = user
  return { user: safeUser, token: generateToken(user.id) }
})

export const registerUser = createAsyncThunk('auth/register', async (formData, { rejectWithValue }) => {
  await simulateDelay()
  const emailNormalized = formData.email.trim().toLowerCase()
  const merged = getMergedUsers()
  
  const exists = merged.find((u) => u.email.trim().toLowerCase() === emailNormalized)
  if (exists) return rejectWithValue('An account with this email already exists.')
  
  const newUser = {
    id: `u${Date.now()}`,
    name: formData.name,
    email: formData.email.trim(),
    password: formData.password,
    role: ROLES.EMPLOYEE,
    department: 'General',
    status: 'Active',
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
  }
  
  try {
    const localUsers = JSON.parse(localStorage.getItem('egrcp_registered_users') || '[]')
    localUsers.push(newUser)
    localStorage.setItem('egrcp_registered_users', JSON.stringify(localUsers))
  } catch (err) {
    return rejectWithValue('Failed to save user credentials locally.')
  }
  
  const { password: _, ...safeUser } = newUser
  return { user: safeUser }
})

export const forgotPassword = createAsyncThunk('auth/forgotPassword', async ({ email }, { rejectWithValue }) => {
  await simulateDelay()
  const emailNormalized = email.trim().toLowerCase()
  const merged = getMergedUsers()
  
  const user = merged.find((u) => u.email.trim().toLowerCase() === emailNormalized)
  if (!user) return rejectWithValue('No account found with this email address.')
  return { message: 'Password reset link sent to your email.' }
})

export const resetPassword = createAsyncThunk('auth/resetPassword', async ({ password }, { rejectWithValue }) => {
  await simulateDelay()
  return { message: 'Your password has been successfully reset.' }
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
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.loading = false
      state.error = null
      state.successMessage = null
    },
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
        state.successMessage = 'Registration successful! Please login.'
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
      .addCase(resetPassword.pending, (state) => { state.loading = true; state.error = null; state.successMessage = null })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false
        state.successMessage = action.payload.message
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { logout, clearError, clearSuccess, updateProfile } = authSlice.actions
export default authSlice.reducer
