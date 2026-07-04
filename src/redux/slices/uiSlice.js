import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  themeMode: 'light',
  sidebarOpen: true,
  sidebarCollapsed: false,
  snackbar: { open: false, message: '', severity: 'info' },
  pageLoading: false,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.themeMode = state.themeMode === 'light' ? 'dark' : 'light'
    },
    setTheme: (state, action) => {
      state.themeMode = action.payload
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload
    },
    toggleSidebarCollapse: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed
    },
    showSnackbar: (state, action) => {
      state.snackbar = { open: true, message: action.payload.message, severity: action.payload.severity || 'info' }
    },
    hideSnackbar: (state) => {
      state.snackbar = { ...state.snackbar, open: false }
    },
    setPageLoading: (state, action) => {
      state.pageLoading = action.payload
    },
  },
})

export const {
  toggleTheme, setTheme,
  toggleSidebar, setSidebarOpen, toggleSidebarCollapse,
  showSnackbar, hideSnackbar,
  setPageLoading,
} = uiSlice.actions

export default uiSlice.reducer
