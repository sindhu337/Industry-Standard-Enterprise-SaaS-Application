import procurementReducer, { updateProcurement } from '@/features/procurement/procurementSlice'

const baseState = {
  items: [
    {
      id: 'PR-20260705-383',
      title: 'Laptop Accessories Refresh for Operations Team',
      status: 'Draft',
      requestedBy: 'Bob Martinez',
      requestedById: 'u002',
      department: 'Operations',
      amount: 150000,
      priority: 'High',
      requestedDate: '2026-07-05',
      lastUpdated: '2026-07-05',
    },
  ],
  selected: null,
  loading: false,
  error: null,
  pagination: { page: 0, pageSize: 10 },
  filters: { search: '', status: 'All', priority: 'All', department: '', startDate: '', endDate: '' },
}

describe('procurement approval workflow', () => {
  it('stores approved status updates in the procurement slice', () => {
    const nextState = procurementReducer(
      baseState,
      updateProcurement.fulfilled(
        {
          id: 'PR-20260705-383',
          data: { status: 'Approved', approvedBy: 'Carol Smith', approvedDate: '2026-07-05' },
        },
        'request-1',
        { id: 'PR-20260705-383' },
      ),
    )

    expect(nextState.items[0].status).toBe('Approved')
    expect(nextState.items[0].approvedBy).toBe('Carol Smith')
  })

  it('stores revision required status updates in the procurement slice', () => {
    const nextState = procurementReducer(
      baseState,
      updateProcurement.fulfilled(
        {
          id: 'PR-20260705-383',
          data: {
            status: 'Revision Required',
            revisionRequestedBy: 'Carol Smith',
            revisionComments: 'Please add the vendor comparison summary.',
          },
        },
        'request-2',
        { id: 'PR-20260705-383' },
      ),
    )

    expect(nextState.items[0].status).toBe('Revision Required')
    expect(nextState.items[0].revisionRequestedBy).toBe('Carol Smith')
    expect(nextState.items[0].revisionComments).toBe('Please add the vendor comparison summary.')
  })

  it('stores rejection reasons in the procurement slice', () => {
    const nextState = procurementReducer(
      baseState,
      updateProcurement.fulfilled(
        {
          id: 'PR-20260705-383',
          data: {
            status: 'Rejected',
            rejectedBy: 'Carol Smith',
            rejectedDate: '2026-07-05',
            rejectionReason: 'Budget is outside the approved threshold.',
          },
        },
        'request-3',
        { id: 'PR-20260705-383' },
      ),
    )

    expect(nextState.items[0].status).toBe('Rejected')
    expect(nextState.items[0].rejectionReason).toBe('Budget is outside the approved threshold.')
  })
})
