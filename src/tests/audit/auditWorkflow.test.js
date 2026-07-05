import auditReducer, { markAuditItemAudited, addAuditObservation } from '@/features/audit/auditSlice'

describe('auditor workflow state', () => {
  it('updates audit status and auditor metadata in redux state', () => {
    const state = {
      queue: [{ id: 'PR-001', title: 'Laptop Refresh', auditStatus: 'Pending Audit', observations: [] }],
      reports: [],
      history: [],
      systemLogs: [],
      userActivities: [],
      summary: null,
      loading: false,
      error: null,
    }

    const nextState = auditReducer(
      state,
      markAuditItemAudited({ id: 'PR-001', auditedBy: 'Alex Reed', auditDate: '2026-07-05' }),
    )

    expect(nextState.queue[0].auditStatus).toBe('Audited')
    expect(nextState.queue[0].auditedBy).toBe('Alex Reed')
    expect(nextState.queue[0].auditDate).toBe('2026-07-05')
  })

  it('stores audit observations with the auditor name and date', () => {
    const state = {
      queue: [{ id: 'PR-002', title: 'Server Upgrade', auditStatus: 'Pending Audit', observations: [] }],
      reports: [],
      history: [],
      systemLogs: [],
      userActivities: [],
      summary: null,
      loading: false,
      error: null,
    }

    const nextState = auditReducer(
      state,
      addAuditObservation({ id: 'PR-002', observation: 'Needs vendor review', auditorName: 'Alex Reed', auditDate: '2026-07-05' }),
    )

    expect(nextState.queue[0].auditStatus).toBe('Observation Raised')
    expect(nextState.queue[0].observations[0].observation).toBe('Needs vendor review')
    expect(nextState.queue[0].observations[0].auditorName).toBe('Alex Reed')
  })
})
