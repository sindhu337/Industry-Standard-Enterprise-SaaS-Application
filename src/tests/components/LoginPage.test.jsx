import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import LoginPage from '@/features/auth/LoginPage';
import * as authSlice from '@/features/auth/authSlice';

jest.mock('@/components/common/AppLogo', () => () => <div data-testid="app-logo" />);
jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useTheme: () => ({
    palette: {
      primary: { main: '#000', dark: '#000', light: '#000' },
      action: { disabledBackground: '#000' },
      divider: '#000',
    },
  }),
}));

const mockStore = configureStore([]);
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('LoginPage Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: { loading: false, error: null },
    });
    store.dispatch = jest.fn();
    jest.clearAllMocks();
  });

  const renderComponent = () =>
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

  it('renders login form correctly', () => {
    renderComponent();
    expect(screen.getByRole('heading', { name: /Sign In/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it('handles typing and submission', async () => {
    
    jest.spyOn(authSlice, 'loginUser').mockReturnValue({ type: 'auth/login/fulfilled', payload: {} });
    
    
    const action = { type: 'auth/login/fulfilled', payload: {} };
    authSlice.loginUser.fulfilled = { match: (a) => a.type === 'auth/login/fulfilled' };
    store.dispatch.mockResolvedValue(action);

    renderComponent();

    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(authSlice.clearError());
      expect(store.dispatch).toHaveBeenCalledWith(
        authSlice.loginUser({ email: 'test@example.com', password: 'password123' })
      );
    });
  });

  it('handles quick login click', async () => {
    const action = { type: 'auth/login/fulfilled', payload: {} };
    authSlice.loginUser.fulfilled = { match: (a) => a.type === 'auth/login/fulfilled' };
    store.dispatch.mockResolvedValue(action);

    renderComponent();

    
    const adminQuickLogin = screen.getByText('Administrator').closest('button');
    fireEvent.click(adminQuickLogin);

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(
        authSlice.loginUser({ email: 'alice@egrcp.com', password: 'Admin@1234' })
      );
    });
  });

  it('toggles password visibility', () => {
    renderComponent();
    const passwordInput = screen.getByLabelText(/Password/i);
    expect(passwordInput.type).toBe('password');

    
    
    
    
    
    
    const toggleButton = passwordInput.parentElement.querySelector('button');
    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe('text');
  });
});
