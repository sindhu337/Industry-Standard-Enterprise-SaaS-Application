


import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon } from
'@mui/icons-material';

import PageContainer from '@/components/common/layout/PageContainer';
import ProcurementDetails from '../components/ProcurementDetails';
import { useProcurement } from '../hooks/useProcurement';
import { ROUTES } from '@/constants/routes';

export default function ProcurementDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    selected,
    loading,
    canApprove,
    canEdit,
    loadById,
    submitApproval,
    postComment
  } = useProcurement();

  useEffect(() => {
    loadById(id);
  }, [loadById, id]);

  const handleApprove = () => submitApproval(id, 'Approved');
  const handleReject = () => submitApproval(id, 'Rejected');
  const handleComment = (text) => postComment(id, text);

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

        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 2
          }}>
          
          <Box>
            <Typography variant="h3" fontWeight={700} id="detail-page-title">
              Requisition Details
            </Typography>
            {selected &&
            <Typography variant="body2" color="text.secondary" display="block" sx={{ mt: 0.5 }}>
                {selected.id} · {selected.department}
              </Typography>
            }
          </Box>

          {selected && canEdit(selected) &&
            <Button
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={() => navigate(`/procurement/${id}/edit`)}
            id="btn-edit-detail"
            sx={{ borderRadius: 1.5, px: 2, py: 0.5, fontWeight: 700 }}>
            
              Edit Requisition
            </Button>
          }
        </Box>
      </Box>

      <ProcurementDetails
        item={selected}
        loading={loading}
        canApprove={canApprove}
        onApprove={handleApprove}
        onReject={handleReject}
        onPostComment={handleComment} />
      
    </PageContainer>);

}