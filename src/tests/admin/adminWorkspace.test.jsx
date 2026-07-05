import { TextEncoder, TextDecoder } from 'util'

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/features/auth/authSlice'
import procurementReducer from '@/features/procurement/procurementSlice'
import AdminWorkspacePage from '@/features/admin/AdminWorkspacePage'
import { ROLES } from '@/constants/roles'

function renderAdminWorkspace() {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      procurement: procurementReducer,
    },
  })

  store.dispatch({ type: 'auth/login/fulfilled', payload: { user: { id: '1', name: 'Admin User', role: ROLES.ADMIN, department: 'IT', status: 'Active' }, token: 'token' } })

  return render(
    <Provider store={store}>
      <MemoryRouter>
        <AdminWorkspacePage />
      </MemoryRouter>
    </Provider>,
  )
}

describe('admin workspace', () => {
  it('renders the administrator dashboard and user management content', () => {
    renderAdminWorkspace()

    expect(screen.getByText('Administrator Workspace')).toBeInTheDocument()
    expect(screen.getByText('Total Users')).toBeInTheDocument()
    expect(screen.getByText('User Management')).toBeInTheDocument()
    expect(screen.getByText('Global Search')).toBeInTheDocument()
  })
})
