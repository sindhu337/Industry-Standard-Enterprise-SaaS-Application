/**
 * Procurement Validation Schema
 * Yup schema for React Hook Form integration
 */
import * as yup from 'yup'

export const procurementSchema = yup.object().shape({
  title: yup
    .string()
    .required('Request title is required')
    .min(5, 'Title must be at least 5 characters')
    .max(120, 'Title cannot exceed 120 characters'),

  description: yup
    .string()
    .required('Description is required')
    .min(20, 'Please provide at least 20 characters of description'),

  category: yup
    .string()
    .required('Procurement category is required'),

  vendor: yup
    .string()
    .required('Target vendor is required'),

  amount: yup
    .number()
    .typeError('Budget amount must be a number')
    .required('Budget amount is required')
    .positive('Amount must be greater than zero')
    .max(10000000, 'Amount cannot exceed 10,000,000'),

  currency: yup
    .string()
    .required('Currency is required')
    .oneOf(['USD', 'EUR', 'GBP'], 'Please select a valid currency'),

  priority: yup
    .string()
    .required('Priority is required')
    .oneOf(['Critical', 'High', 'Medium', 'Low'], 'Invalid priority level'),

  requiredDate: yup
    .string()
    .required('Required delivery date is required')
    .test('future-date', 'Required date must be today or in the future', (value) => {
      if (!value) return false
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return new Date(value) >= today
    }),
})

export const commentSchema = yup.object().shape({
  text: yup
    .string()
    .required('Comment cannot be empty')
    .min(3, 'Comment must be at least 3 characters')
    .max(500, 'Comment cannot exceed 500 characters'),
})
