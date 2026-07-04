import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import authReducer from '@/features/auth/authSlice'
import dashboardReducer from '@/features/dashboard/dashboardSlice'
import procurementReducer from '@/features/procurement/procurementSlice'
import vendorReducer from '@/features/vendors/vendorSlice'
import riskReducer from '@/features/risk/riskSlice'
import complianceReducer from '@/features/compliance/complianceSlice'
import auditReducer from '@/features/audit/auditSlice'
import reportReducer from '@/features/reports/reportSlice'
import notificationReducer from '@/features/notifications/notificationSlice'
import uiReducer from '@/app/store/slices/uiSlice'

const resolvedStorage = storage?.getItem ? storage : storage?.default ?? storage

const authPersistConfig = {
  key: 'egrcp-auth',
  storage: resolvedStorage,
  whitelist: ['user', 'token', 'isAuthenticated'],
}

const uiPersistConfig = {
  key: 'egrcp-ui',
  storage: resolvedStorage,
  whitelist: ['themeMode', 'sidebarCollapsed'],
}

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  ui: persistReducer(uiPersistConfig, uiReducer),
  dashboard: dashboardReducer,
  procurement: procurementReducer,
  vendors: vendorReducer,
  risk: riskReducer,
  compliance: complianceReducer,
  audit: auditReducer,
  reports: reportReducer,
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
