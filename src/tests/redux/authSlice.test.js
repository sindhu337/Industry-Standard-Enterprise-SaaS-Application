import authReducer, { logout, clearError, clearSuccess, updateProfile, loginUser, registerUser, forgotPassword, resetPassword } from '@/features/auth/authSlice';
import { ROLES } from '@/constants/roles';
import configureStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';

// Mock localStorage
const mockLocalStorage = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => { store[key] = value.toString(); },
    removeItem: (key) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();
Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

// Mock users JSON
jest.mock('@/mocks/users.json', () => ([
  { id: '1', name: 'Test User', email: 'test@example.com', password: 'password123', role: 'Employee' }
]));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('authSlice', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      error: null,
      successMessage: null,
    };
    window.localStorage.clear();
  });

  describe('synchronous reducers', () => {
    it('should handle logout', () => {
      const state = { ...initialState, user: { name: 'Test' }, isAuthenticated: true };
      expect(authReducer(state, logout())).toEqual(initialState);
    });

    it('should handle clearError', () => {
      const state = { ...initialState, error: 'Some error' };
      expect(authReducer(state, clearError())).toEqual({ ...state, error: null });
    });

    it('should handle clearSuccess', () => {
      const state = { ...initialState, successMessage: 'Success!' };
      expect(authReducer(state, clearSuccess())).toEqual({ ...state, successMessage: null });
    });

    it('should handle updateProfile', () => {
      const state = { ...initialState, user: { name: 'Old Name' } };
      expect(authReducer(state, updateProfile({ name: 'New Name' }))).toEqual({
        ...state,
        user: { name: 'New Name' },
      });
    });

    it('should ignore updateProfile if no user', () => {
      expect(authReducer(initialState, updateProfile({ name: 'New Name' }))).toEqual(initialState);
    });
  });

  describe('async thunks execution', () => {
    let store;
    beforeEach(() => {
      store = mockStore(initialState);
    });

    it('loginUser success', async () => {
      await store.dispatch(loginUser({ email: 'test@example.com', password: 'password123' }));
      const actions = store.getActions();
      expect(actions[0].type).toBe(loginUser.pending.type);
      expect(actions[1].type).toBe(loginUser.fulfilled.type);
      expect(actions[1].payload.user.email).toBe('test@example.com');
    });

    it('loginUser failure', async () => {
      await store.dispatch(loginUser({ email: 'wrong@example.com', password: 'password123' }));
      const actions = store.getActions();
      expect(actions[0].type).toBe(loginUser.pending.type);
      expect(actions[1].type).toBe(loginUser.rejected.type);
      expect(actions[1].payload).toBe('Invalid email or password.');
    });

    it('registerUser success', async () => {
      await store.dispatch(registerUser({ name: 'New', email: 'new@example.com', password: '123' }));
      const actions = store.getActions();
      expect(actions[0].type).toBe(registerUser.pending.type);
      expect(actions[1].type).toBe(registerUser.fulfilled.type);
      expect(actions[1].payload.user.email).toBe('new@example.com');
    });

    it('registerUser failure exists', async () => {
      await store.dispatch(registerUser({ name: 'New', email: 'test@example.com', password: '123' }));
      const actions = store.getActions();
      expect(actions[0].type).toBe(registerUser.pending.type);
      expect(actions[1].type).toBe(registerUser.rejected.type);
      expect(actions[1].payload).toBe('An account with this email already exists.');
    });

    it('registerUser failure local storage error', async () => {
      // Mock localStorage to throw error
      const originalSetItem = window.localStorage.setItem;
      window.localStorage.setItem = () => { throw new Error('Quota Exceeded'); };

      await store.dispatch(registerUser({ name: 'Fail', email: 'fail@example.com', password: '123' }));
      const actions = store.getActions();
      expect(actions[0].type).toBe(registerUser.pending.type);
      expect(actions[1].type).toBe(registerUser.rejected.type);
      expect(actions[1].payload).toBe('Failed to save user credentials locally.');

      window.localStorage.setItem = originalSetItem;
    });

    it('forgotPassword success', async () => {
      await store.dispatch(forgotPassword({ email: 'test@example.com' }));
      const actions = store.getActions();
      expect(actions[0].type).toBe(forgotPassword.pending.type);
      expect(actions[1].type).toBe(forgotPassword.fulfilled.type);
    });

    it('forgotPassword failure', async () => {
      await store.dispatch(forgotPassword({ email: 'none@example.com' }));
      const actions = store.getActions();
      expect(actions[0].type).toBe(forgotPassword.pending.type);
      expect(actions[1].type).toBe(forgotPassword.rejected.type);
    });

    it('resetPassword success', async () => {
      await store.dispatch(resetPassword({ password: 'new' }));
      const actions = store.getActions();
      expect(actions[0].type).toBe(resetPassword.pending.type);
      expect(actions[1].type).toBe(resetPassword.fulfilled.type);
    });
  });

  describe('async thunks reducers handling', () => {
    // Testing logic via dispatch would require configureStore, but we can test reducer handling directly.

    // loginUser
    it('sets loading on loginUser.pending', () => {
      expect(authReducer(initialState, { type: loginUser.pending.type })).toEqual({
        ...initialState,
        loading: true,
      });
    });

    it('sets user and token on loginUser.fulfilled', () => {
      const payload = { user: { id: '1' }, token: 'mock-token' };
      expect(authReducer(initialState, { type: loginUser.fulfilled.type, payload })).toEqual({
        ...initialState,
        loading: false,
        user: payload.user,
        token: payload.token,
        isAuthenticated: true,
      });
    });

    it('sets error on loginUser.rejected', () => {
      expect(authReducer(initialState, { type: loginUser.rejected.type, payload: 'Error' })).toEqual({
        ...initialState,
        loading: false,
        error: 'Error',
      });
    });

    // registerUser
    it('sets error on registerUser.rejected', () => {
      expect(authReducer(initialState, { type: registerUser.rejected.type, payload: 'Err' })).toEqual({
        ...initialState,
        loading: false,
        error: 'Err',
      });
    });
    it('sets loading on registerUser.pending', () => {
      expect(authReducer(initialState, { type: registerUser.pending.type })).toEqual({
        ...initialState,
        loading: true,
      });
    });
    it('sets success message on registerUser.fulfilled', () => {
      expect(authReducer(initialState, { type: registerUser.fulfilled.type })).toEqual({
        ...initialState,
        loading: false,
        successMessage: 'Registration successful! Please login.',
      });
    });

    // forgotPassword
    it('sets success message on forgotPassword.fulfilled', () => {
      const payload = { message: 'Link sent' };
      expect(authReducer(initialState, { type: forgotPassword.fulfilled.type, payload })).toEqual({
        ...initialState,
        loading: false,
        successMessage: 'Link sent',
      });
    });
    it('sets error on forgotPassword.rejected', () => {
      expect(authReducer(initialState, { type: forgotPassword.rejected.type, payload: 'Err' })).toEqual({
        ...initialState,
        loading: false,
        error: 'Err',
      });
    });

    // resetPassword
    it('sets success message on resetPassword.fulfilled', () => {
      const payload = { message: 'Password reset' };
      expect(authReducer(initialState, { type: resetPassword.fulfilled.type, payload })).toEqual({
        ...initialState,
        loading: false,
        successMessage: 'Password reset',
      });
    });
    it('sets error on resetPassword.rejected', () => {
      expect(authReducer(initialState, { type: resetPassword.rejected.type, payload: 'Err' })).toEqual({
        ...initialState,
        loading: false,
        error: 'Err',
      });
    });
  });
});
