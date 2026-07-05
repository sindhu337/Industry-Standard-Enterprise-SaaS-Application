import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  Paper,
  Divider,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import PageContainer from '@/components/common/layout/PageContainer'
import { createProcurement, updateProcurement } from './procurementSlice'
import { showSnackbar } from '@/app/store/slices/uiSlice'
import { ROUTES } from '@/constants/routes'
import { procurementSchema } from '@/validations/procurement.validation'

export default function ProcurementCreatePage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useSelector((state) => state.auth)
  const { items } = useSelector((state) => state.procurement)

  const editId = location.state?.editId
  const editItem = editId ? items.find((item) => item.id === editId) : null
  const isEditMode = Boolean(editItem)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(procurementSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      vendor: '',
      amount: '',
      currency: 'USD',
      priority: 'Medium',
      requiredDate: '',
    },
  })

  useEffect(() => {
    if (isEditMode && editItem) {
      setValue('title', editItem.title)
      setValue('description', editItem.description)
      setValue('category', editItem.category)
      setValue('vendor', editItem.vendor)
      setValue('amount', editItem.amount)
      setValue('currency', editItem.currency || 'USD')
      setValue('priority', editItem.priority)
      setValue('requiredDate', editItem.requiredDate)
    }
  }, [isEditMode, editItem, setValue])

  const onSubmit = async (data) => {
    if (isEditMode) {
      const result = await dispatch(updateProcurement({ id: editId, data }))
      if (updateProcurement.fulfilled.match(result)) {
        dispatch(showSnackbar({ message: `Procurement Request ${editId} updated successfully.`, severity: 'success' }))
        navigate(ROUTES.PROCUREMENT)
      } else {
        dispatch(showSnackbar({ message: 'Update failed.', severity: 'error' }))
      }
    } else {
      const requestPayload = {
        ...data,
        requestedBy: user?.name || 'System User',
        requestedById: user?.id || 'u001',
        department: user?.department || 'Operations',
        status: 'Pending Approval',
      }
      const result = await dispatch(createProcurement(requestPayload))
      if (createProcurement.fulfilled.match(result)) {
        dispatch(showSnackbar({ message: 'Requisition submitted for approval successfully.', severity: 'success' }))
        navigate(ROUTES.PROCUREMENT)
      } else {
        dispatch(showSnackbar({ message: 'Submission failed.', severity: 'error' }))
      }
    }
  }

  return (
    <PageContainer>
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(ROUTES.PROCUREMENT)}
          sx={{ mb: 2, textTransform: 'none', fontWeight: 'bold' }}
        >
          Back to Requisitions
        </Button>
        <Typography variant="h5" fontWeight="bold">
          {isEditMode ? `Edit Requisition (${editId})` : 'New Requisition Request'}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Document the description, items details, budget, and priority matrix for approval routing
        </Typography>
      </Box>

      <Paper sx={{ p: 4, borderRadius: 2.5 }}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
            Requisition Details
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                {...register('title')}
                label="Requisition Title"
                fullWidth
                required
                error={Boolean(errors.title)}
                helperText={errors.title?.message}
                disabled={isSubmitting}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                {...register('description')}
                label="Detailed Description"
                multiline
                rows={4}
                fullWidth
                required
                error={Boolean(errors.description)}
                helperText={errors.description?.message}
                disabled={isSubmitting}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                {...register('category')}
                label="Procurement Category"
                select
                fullWidth
                required
                error={Boolean(errors.category)}
                helperText={errors.category?.message}
                defaultValue=""
                disabled={isSubmitting}
              >
                <MenuItem value="IT Hardware">IT Hardware</MenuItem>
                <MenuItem value="Software">Software</MenuItem>
                <MenuItem value="IT Services">IT Services</MenuItem>
                <MenuItem value="Office Supplies">Office Supplies</MenuItem>
                <MenuItem value="Logistics">Logistics</MenuItem>
                <MenuItem value="Professional Services">Professional Services</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                {...register('vendor')}
                label="Target Supplier / Vendor"
                select
                fullWidth
                required
                error={Boolean(errors.vendor)}
                helperText={errors.vendor?.message}
                defaultValue=""
                disabled={isSubmitting}
              >
                <MenuItem value="TechNova Solutions">TechNova Solutions</MenuItem>
                <MenuItem value="GlobalEdge Procurement">GlobalEdge Procurement</MenuItem>
                <MenuItem value="SecureVault Systems">SecureVault Systems</MenuItem>
                <MenuItem value="Apex Supplies Co.">Apex Supplies Co.</MenuItem>
                <MenuItem value="Zenith Logistics LLC">Zenith Logistics LLC</MenuItem>
              </TextField>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
            Budgeting & Prioritization
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register('amount')}
                label="Est. Budget Amount"
                type="number"
                fullWidth
                required
                error={Boolean(errors.amount)}
                helperText={errors.amount?.message}
                disabled={isSubmitting}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                {...register('currency')}
                label="Currency"
                select
                fullWidth
                required
                disabled={isSubmitting}
              >
                <MenuItem value="USD">USD ($)</MenuItem>
                <MenuItem value="EUR">EUR (€)</MenuItem>
                <MenuItem value="GBP">GBP (£)</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                {...register('priority')}
                label="Urgency Priority"
                select
                fullWidth
                required
                disabled={isSubmitting}
              >
                <MenuItem value="Critical">Critical</MenuItem>
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                {...register('requiredDate')}
                label="Required Date"
                type="date"
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                error={Boolean(errors.requiredDate)}
                helperText={errors.requiredDate?.message}
                disabled={isSubmitting}
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              onClick={() => navigate(ROUTES.PROCUREMENT)}
              disabled={isSubmitting}
              sx={{ borderRadius: 2, px: 3 }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              sx={{ borderRadius: 2, px: 4, fontWeight: 'bold' }}
            >
              {isEditMode ? 'Save Changes' : 'Submit Requisition'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </PageContainer>
  )
}
