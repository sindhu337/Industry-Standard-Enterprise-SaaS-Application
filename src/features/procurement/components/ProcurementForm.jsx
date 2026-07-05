/**
 * ProcurementForm – Reusable form for create and edit
 * Uses React Hook Form + Yup validation
 */
import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Box,
  Grid,
  TextField,
  MenuItem,
  Button,
  Divider,
  Typography,
  CircularProgress,
} from '@mui/material'
import {
  Save as SaveIcon,
  Send as SubmitIcon,
} from '@mui/icons-material'

import { procurementSchema } from '../validations/procurementValidation'
import {
  PROCUREMENT_CATEGORIES,
  PROCUREMENT_VENDORS,
  PROCUREMENT_CURRENCIES,
} from '../data/procurementMockData'

const DEFAULT_VALUES = {
  title: '',
  description: '',
  category: '',
  vendor: '',
  amount: '',
  currency: 'USD',
  priority: 'Medium',
  requiredDate: '',
}

export default function ProcurementForm({
  editItem = null,
  onSubmit,
  onCancel,
  isSubmitting = false,
}) {
  const isEditMode = Boolean(editItem)

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(procurementSchema),
    defaultValues: DEFAULT_VALUES,
  })

  // Populate form when editing
  useEffect(() => {
    if (isEditMode && editItem) {
      reset({
        title: editItem.title || '',
        description: editItem.description || '',
        category: editItem.category || '',
        vendor: editItem.vendor || '',
        amount: editItem.amount || '',
        currency: editItem.currency || 'USD',
        priority: editItem.priority || 'Medium',
        requiredDate: editItem.requiredDate || '',
      })
    } else {
      reset(DEFAULT_VALUES)
    }
  }, [isEditMode, editItem, reset])

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* ── Section 1: Requisition Details ───────────────────────────── */}
      <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2.5 }}>
        Requisition Details
      </Typography>

      <Grid container spacing={3}>
        {/* Title */}
        <Grid item xs={12}>
          <TextField
            {...register('title')}
            label="Requisition Title"
            fullWidth
            required
            error={Boolean(errors.title)}
            helperText={errors.title?.message}
            disabled={isSubmitting}
            id="field-title"
            placeholder="e.g. Enterprise Laptop Fleet Refresh"
          />
        </Grid>

        {/* Description */}
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
            id="field-description"
            placeholder="Describe the procurement need, scope, and expected outcomes…"
          />
        </Grid>

        {/* Category */}
        <Grid item xs={12} sm={6}>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Procurement Category"
                fullWidth
                required
                error={Boolean(errors.category)}
                helperText={errors.category?.message}
                disabled={isSubmitting}
                id="field-category"
              >
                {PROCUREMENT_CATEGORIES.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>

        {/* Vendor */}
        <Grid item xs={12} sm={6}>
          <Controller
            name="vendor"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Target Supplier / Vendor"
                fullWidth
                required
                error={Boolean(errors.vendor)}
                helperText={errors.vendor?.message}
                disabled={isSubmitting}
                id="field-vendor"
              >
                {PROCUREMENT_VENDORS.map((v) => (
                  <MenuItem key={v.id} value={v.name}>
                    {v.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* ── Section 2: Budget & Priority ─────────────────────────────── */}
      <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2.5 }}>
        Budget &amp; Prioritization
      </Typography>

      <Grid container spacing={3}>
        {/* Amount */}
        <Grid item xs={12} sm={6}>
          <TextField
            {...register('amount')}
            label="Estimated Budget Amount"
            type="number"
            fullWidth
            required
            inputProps={{ min: 1 }}
            error={Boolean(errors.amount)}
            helperText={errors.amount?.message}
            disabled={isSubmitting}
            id="field-amount"
            placeholder="0.00"
          />
        </Grid>

        {/* Currency */}
        <Grid item xs={12} sm={6}>
          <Controller
            name="currency"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Currency"
                fullWidth
                required
                disabled={isSubmitting}
                id="field-currency"
              >
                {PROCUREMENT_CURRENCIES.map((c) => (
                  <MenuItem key={c.code} value={c.code}>
                    {c.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>

        {/* Priority */}
        <Grid item xs={12} sm={6}>
          <Controller
            name="priority"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Urgency Priority"
                fullWidth
                required
                disabled={isSubmitting}
                id="field-priority"
                error={Boolean(errors.priority)}
                helperText={errors.priority?.message}
              >
                <MenuItem value="Critical">🔴 Critical</MenuItem>
                <MenuItem value="High">🟠 High</MenuItem>
                <MenuItem value="Medium">🟡 Medium</MenuItem>
                <MenuItem value="Low">🟢 Low</MenuItem>
              </TextField>
            )}
          />
        </Grid>

        {/* Required Date */}
        <Grid item xs={12} sm={6}>
          <TextField
            {...register('requiredDate')}
            label="Required Delivery Date"
            type="date"
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
            error={Boolean(errors.requiredDate)}
            helperText={errors.requiredDate?.message}
            disabled={isSubmitting}
            id="field-required-date"
          />
        </Grid>
      </Grid>

      {/* ── Form Actions ──────────────────────────────────────────────── */}
      <Box sx={{ mt: 5, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        <Button
          variant="outlined"
          onClick={onCancel}
          disabled={isSubmitting}
          id="btn-cancel-form"
          sx={{ borderRadius: 2, px: 3 }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting}
          startIcon={
            isSubmitting ? (
              <CircularProgress size={18} color="inherit" />
            ) : isEditMode ? (
              <SaveIcon />
            ) : (
              <SubmitIcon />
            )
          }
          id="btn-submit-form"
          sx={{ borderRadius: 2, px: 4, fontWeight: 700 }}
        >
          {isSubmitting
            ? 'Submitting…'
            : isEditMode
            ? 'Save Changes'
            : 'Submit Requisition'}
        </Button>
      </Box>
    </Box>
  )
}
