import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import authReducer from './slices/authSlice'
import uiReducer from './slices/uiSlice'
import notificationReducer from './slices/notificationSlice'

const authPersistConfig = {
  key: 'egrcp-auth',
  storage,
  whitelist: ['user', 'token', 'isAuthenticated'],
}

const uiPersistConfig = {
  key: 'egrcp-ui',
  storage,
  whitelist: ['themeMode', 'sidebarCollapsed'],
}

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  ui: persistReducer(uiPersistConfig, uiReducer),
  notifications: notificationReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: import.meta.env.DEV,
})

export const persistor = persistStore(store)
