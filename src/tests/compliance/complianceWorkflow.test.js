import procurementReducer, { updateProcurement } from '@/features/procurement/procurementSlice'

const baseState = {
  items: [
    {
      id: 'PR-20260705-383',
      title: 'Laptop Accessories Refresh for Operations Team',
      status: 'Approved',
      requestedBy: 'Bob Martinez',
      requestedById: 'u002',
      department: 'Operations',
      amount: 150000,
      priority: 'High',
      requestedDate: '2026-07-05',
      lastUpdated: '2026-07-05',
      comments: [],
    },
  ],
  selected: null,
  loading: false,
  error: null,
  pagination: { page: 0, pageSize: 10 },
  filters: { search: '', status: 'All', priority: 'All', department: '', startDate: '', endDate: '' },
}

describe('compliance officer workflow', () => {
  it('stores compliance review outcomes in the procurement slice', () => {
    const nextState = procurementReducer(
      baseState,
      updateProcurement.fulfilled(
        {
          id: 'PR-20260705-383',
          data: {
            complianceStatus: 'Compliant',
            reviewedBy: 'Carol Smith',
            reviewedDate: '2026-07-05',
            comments: [{ author: 'Carol Smith', text: 'Compliant reviewed.', date: '2026-07-05' }],
          },
        },
        'request-1',
        { id: 'PR-20260705-383' },
      ),
    )

    expect(nextState.items[0].complianceStatus).toBe('Compliant')
    expect(nextState.items[0].reviewedBy).toBe('Carol Smith')
    expect(nextState.items[0].comments[0].text).toBe('Compliant reviewed.')
  })
})
