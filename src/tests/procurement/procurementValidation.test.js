import { procurementSchema } from '@/features/procurement/validations/procurementValidation'

describe('procurement request validation', () => {
  it('requires department and rejects invalid budget and past dates', async () => {
    await expect(
      procurementSchema.validate({
        title: 'abc',
        description: 'Short description',
        category: 'Software',
        vendor: 'Dell Technologies',
        amount: 0,
        currency: 'USD',
        priority: 'High',
        requiredDate: '2020-01-01',
      }),
    ).rejects.toThrow()
  })
})
