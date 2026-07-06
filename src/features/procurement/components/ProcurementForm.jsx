import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Grid,
  TextField,
  MenuItem,
  Button,
  Divider,
  Typography,
  CircularProgress,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
  Save as SaveIcon,
  Send as SubmitIcon,
} from '@mui/icons-material';
import dayjs from 'dayjs';

import { showSnackbar } from '@/app/store/slices/uiSlice';
import { procurementSchema } from '../validations/procurementValidation';
import {
  PROCUREMENT_CATEGORIES,
  PROCUREMENT_DEPARTMENTS,
  PROCUREMENT_VENDORS,
  PROCUREMENT_CURRENCIES,
} from '../data/procurementMockData';

const DEFAULT_VALUES = {
  title: '',
  description: '',
  department: '',
  category: '',
  vendor: '',
  amount: '',
  currency: 'INR',
  priority: 'Medium',
  requiredDate: '',
  attachment: '',
  notes: '',
};

function generateProcurementId() {
  const now = new Date();
  return `PR-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${Math.floor(100 + Math.random() * 900)}`;
}

export default function ProcurementForm({
  editItem = null,
  onSubmit,
  onCancel,
  isSubmitting = false,
}) {
  const dispatch = useDispatch();
  const isEditMode = Boolean(editItem);
  const [generatedId, setGeneratedId] = useState(() => generateProcurementId());
  const [selectedAttachmentFile, setSelectedAttachmentFile] = useState(null);
  const [attachmentDisplayName, setAttachmentDisplayName] = useState('');

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitted },
  } = useForm({
    resolver: yupResolver(procurementSchema),
    defaultValues: DEFAULT_VALUES,
  });

  useEffect(() => {
    if (isEditMode && editItem) {
      reset({
        title: editItem.title || '',
        description: editItem.description || '',
        department: editItem.department || '',
        category: editItem.category || '',
        vendor: editItem.vendor || '',
        amount: editItem.amount || '',
        currency: editItem.currency || 'INR',
        priority: editItem.priority || 'Medium',
        requiredDate: editItem.requiredDate || '',
        attachment: editItem.attachment || '',
        notes: editItem.notes || '',
      });
      const existingAttachmentName = typeof editItem?.attachment === 'string' ? editItem.attachment : '';
      setAttachmentDisplayName(existingAttachmentName);
      setSelectedAttachmentFile(null);
      setGeneratedId(editItem.id || generateProcurementId());
    } else {
      reset(DEFAULT_VALUES);
      setAttachmentDisplayName('');
      setSelectedAttachmentFile(null);
      setGeneratedId(generateProcurementId());
    }
  }, [isEditMode, editItem, reset]);

  useEffect(() => {
    if (isSubmitted && Object.keys(errors).length > 0) {
      dispatch(showSnackbar({ message: 'Please correct the highlighted fields before submitting.', severity: 'error' }));
    }
  }, [dispatch, errors, isSubmitted]);

  const handleAttachmentChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/png', 'image/jpeg', 'image/jpg'];
    const extension = file.name.split('.').pop()?.toLowerCase();
    const allowedExtensions = ['pdf', 'doc', 'docx', 'png', 'jpg', 'jpeg'];

    if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(extension)) {
      dispatch(showSnackbar({ message: 'Please select a PDF, DOC, DOCX, PNG, JPG, or JPEG file.', severity: 'error' }));
      event.target.value = '';
      return;
    }

    setSelectedAttachmentFile(file);
    setAttachmentDisplayName(file.name);
  };

  const handleFormSubmit = (data) => {
    const payload = {
      ...data,
      id: isEditMode ? editItem?.id : generatedId,
      requiredDate: data.requiredDate
        ? dayjs(data.requiredDate).format('YYYY-MM-DD')
        : '',
      attachment: selectedAttachmentFile ? selectedAttachmentFile.name : data.attachment || '',
      attachmentFile: selectedAttachmentFile,
      notes: data.notes || '',
    };
    onSubmit(payload);
  };

  const readOnlyProcurementId = useMemo(
    () => (isEditMode ? editItem?.id || generatedId : generatedId),
    [editItem, generatedId, isEditMode],
  );

  return (
    <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} noValidate>
      <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2.5 }}>
        Requisition Details
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            value={readOnlyProcurementId}
            label="Procurement ID"
            fullWidth
            slotProps={{ input: { readOnly: true } }}
            disabled={isSubmitting}
            id="field-procurement-id"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            {...register('title')}
            label="Request Title"
            fullWidth
            required
            error={Boolean(errors.title)}
            helperText={errors.title?.message}
            disabled={isSubmitting}
            id="field-title"
            placeholder="e.g. Enterprise Laptop Fleet Refresh"
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            {...register('description')}
            label="Description"
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

        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="department"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Department"
                fullWidth
                required
                error={Boolean(errors.department)}
                helperText={errors.department?.message}
                disabled={isSubmitting}
                id="field-department"
              >
                {PROCUREMENT_DEPARTMENTS.map((dept) => (
                  <MenuItem key={dept} value={dept}>
                    {dept}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Category"
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

        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="vendor"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Preferred Vendor"
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

        <Grid size={{ xs: 12, sm: 6 }}>
          <Box>
            <Button
              component="label"
              variant="outlined"
              disabled={isSubmitting}
              id="field-attachment"
              fullWidth
              sx={{ borderRadius: 2, px: 3, mb: 1, py: 1.5 }}
            >
              Attachment
              <input
                id="input-attachment"
                type="file"
                hidden
                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                onChange={handleAttachmentChange}
              />
            </Button>
            <Typography variant="body2" color="text.secondary" sx={{ minHeight: 24 }}>
              {attachmentDisplayName || 'No file chosen'}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2.5 }}>
        Budget &amp; Prioritization
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            {...register('amount')}
            label="Estimated Budget"
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

        <Grid size={{ xs: 12, sm: 6 }}>
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

        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="priority"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Priority"
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

        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="requiredDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                label="Required Date *"
                value={field.value ? dayjs(field.value) : null}
                onChange={(newValue) => {
                  field.onChange(newValue ? newValue.toISOString() : '');
                }}
                disabled={isSubmitting}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: Boolean(errors.requiredDate),
                    helperText: errors.requiredDate?.message,
                    id: 'field-required-date',
                  },
                }}
                format="DD/MM/YYYY"
                disablePast
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            {...register('notes')}
            label="Additional Notes"
            multiline
            rows={3}
            fullWidth
            disabled={isSubmitting}
            id="field-notes"
            placeholder="Add any supplementary context for the request"
            error={Boolean(errors.notes)}
            helperText={errors.notes?.message}
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 5, display: 'flex', gap: 2, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
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
  );
}