import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { useAudit } from '@/features/audit/hooks/useAudit';
import * as auditSlice from '@/features/audit/auditSlice';

const mockStore = configureStore([]);

jest.mock('@/features/audit/auditSlice', () => ({
  fetchAuditReports: jest.fn(() => ({ type: 'fetchAuditReports' })),
  fetchAuditHistory: jest.fn(() => ({ type: 'fetchAuditHistory' })),
  fetchSystemLogs: jest.fn(() => ({ type: 'fetchSystemLogs' })),
  fetchUserActivities: jest.fn(() => ({ type: 'fetchUserActivities' })),
  loadAuditorQueue: jest.fn(() => ({ type: 'loadAuditorQueue' })),
  markAuditItemAudited: jest.fn(() => ({ type: 'markAuditItemAudited' })),
  addAuditObservation: jest.fn(() => ({ type: 'addAuditObservation' })),
}));

describe('useAudit Hook', () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = mockStore({
      audit: {
        reports: [],
        history: [],
        systemLogs: [],
        userActivities: [],
        queue: [],
        loading: false,
        error: null,
      },
    });
    store.dispatch = jest.fn();
    wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
    jest.clearAllMocks();
  });

  it('should return initial state', () => {
    const { result } = renderHook(() => useAudit(), { wrapper });

    expect(result.current.reports).toEqual([]);
    expect(result.current.history).toEqual([]);
    expect(result.current.systemLogs).toEqual([]);
    expect(result.current.userActivities).toEqual([]);
    expect(result.current.queue).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should call loadAll successfully', () => {
    const { result } = renderHook(() => useAudit(), { wrapper });

    act(() => {
      result.current.loadAll();
    });

    expect(store.dispatch).toHaveBeenCalledTimes(5);
    expect(auditSlice.fetchAuditReports).toHaveBeenCalled();
    expect(auditSlice.fetchAuditHistory).toHaveBeenCalled();
    expect(auditSlice.fetchSystemLogs).toHaveBeenCalled();
    expect(auditSlice.fetchUserActivities).toHaveBeenCalled();
    expect(auditSlice.loadAuditorQueue).toHaveBeenCalled();
  });

  it('should call markAudited with correct args', () => {
    const { result } = renderHook(() => useAudit(), { wrapper });

    act(() => {
      result.current.markAudited('id1', 'Alice', '2026-07-06');
    });

    expect(auditSlice.markAuditItemAudited).toHaveBeenCalledWith({
      id: 'id1',
      auditedBy: 'Alice',
      auditDate: '2026-07-06',
    });
    expect(store.dispatch).toHaveBeenCalledWith({ type: 'markAuditItemAudited' });
  });

  it('should call addObservation with correct args', () => {
    const { result } = renderHook(() => useAudit(), { wrapper });

    act(() => {
      result.current.addObservation('id1', 'Looks good', 'Alice', '2026-07-06');
    });

    expect(auditSlice.addAuditObservation).toHaveBeenCalledWith({
      id: 'id1',
      observation: 'Looks good',
      auditorName: 'Alice',
      auditDate: '2026-07-06',
    });
    expect(store.dispatch).toHaveBeenCalledWith({ type: 'addAuditObservation' });
  });
});
