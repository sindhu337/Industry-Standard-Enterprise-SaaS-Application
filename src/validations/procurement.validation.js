import * as yup from 'yup'

export const procurementSchema = yup.object().shape({
  title: yup
    .string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters'),
  description: yup
    .string()
    .required('Description is required'),
  category: yup
    .string()
    .required('Category is required'),
  vendor: yup
    .string()
    .required('Vendor is required'),
  amount: yup
    .number()
    .typeError('Amount must be a number')
    .required('Budget amount is required')
    .positive('Amount must be greater than zero'),
  priority: yup
    .string()
    .required('Priority is required'),
  requiredDate: yup
    .string()
    .required('Required date is required'),
})
