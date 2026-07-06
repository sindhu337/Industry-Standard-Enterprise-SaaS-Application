


import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Typography, Button, Paper, Skeleton } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';

import PageContainer from '@/components/common/layout/PageContainer';
import ProcurementForm from '../components/ProcurementForm';
import { useProcurement } from '../hooks/useProcurement';
import { ROUTES } from '@/constants/routes';

export default function EditProcurementPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { items, loading, loadAll, submitUpdate } = useProcurement();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const editItem = items.find((item) => item.id === id) || null;

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    await submitUpdate(id, data);
    setIsSubmitting(false);
  };

  return (
    <PageContainer>
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(ROUTES.PROCUREMENT)}
          sx={{ mb: 2, textTransform: 'none', fontWeight: 700 }}
          id="btn-back-to-list">
          
          Back to Requisitions
        </Button>

        {loading && !editItem ?
        <>
            <Skeleton width={320} height={32} />
            <Skeleton width={240} height={20} sx={{ mt: 0.5 }} />
          </> :

        <>
            <Typography variant="h3" fontWeight={700} id="edit-page-title">
              Edit Requisition {id && `(${id})`}
            </Typography>
            <Typography
            variant="body2"
            color="text.secondary"
            display="block"
            sx={{ mt: 0.5 }}>
            
              Update the request details and resubmit for approval
            </Typography>
          </>
        }
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, sm: 4 },
          borderRadius: 1.5,
          border: '1px solid',
          borderColor: 'divider'
        }}>
        
        <ProcurementForm
          editItem={editItem}
          onSubmit={handleSubmit}
          onCancel={() => navigate(ROUTES.PROCUREMENT)}
          isSubmitting={isSubmitting} />
        
      </Paper>
    </PageContainer>);

}