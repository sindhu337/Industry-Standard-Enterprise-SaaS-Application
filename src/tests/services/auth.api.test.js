import { authApi } from '@/services/auth.api';
import apiClient from '@/services/apiClient';

jest.mock('@/services/apiClient', () => ({
  post: jest.fn(),
  get: jest.fn(),
  put: jest.fn(),
}));

describe('auth.api', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call login', () => {
    authApi.login({ email: 'test', password: '123' });
    expect(apiClient.post).toHaveBeenCalledWith('/auth/login', { email: 'test', password: '123' });
  });

  it('should call register', () => {
    authApi.register({ email: 'test' });
    expect(apiClient.post).toHaveBeenCalledWith('/auth/register', { email: 'test' });
  });

  it('should call logout', () => {
    authApi.logout();
    expect(apiClient.post).toHaveBeenCalledWith('/auth/logout');
  });

  it('should call forgotPassword', () => {
    authApi.forgotPassword('test@test.com');
    expect(apiClient.post).toHaveBeenCalledWith('/auth/forgot-password', { email: 'test@test.com' });
  });

  it('should call resetPassword', () => {
    authApi.resetPassword({ pass: 'new' });
    expect(apiClient.post).toHaveBeenCalledWith('/auth/reset-password', { pass: 'new' });
  });

  it('should call getProfile', () => {
    authApi.getProfile();
    expect(apiClient.get).toHaveBeenCalledWith('/auth/me');
  });

  it('should call updateProfile', () => {
    authApi.updateProfile({ name: 'updated' });
    expect(apiClient.put).toHaveBeenCalledWith('/auth/me', { name: 'updated' });
  });
});
