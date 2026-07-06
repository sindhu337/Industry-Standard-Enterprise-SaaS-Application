



import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  fetchProcurements,
  fetchProcurementById,
  createProcurement,
  updateProcurement,
  deleteProcurement,
  addComment,
  setFilters,
  clearSelected,
  setPagination } from
'../procurementSlice';
import { showSnackbar } from '@/app/store/slices/uiSlice';
import { ROUTES } from '@/constants/routes';

export function useProcurement() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, selected, loading, error, filters, pagination } = useSelector(
    (state) => state.procurement
  );
  const { user } = useSelector((state) => state.auth);


  const filteredItems = useMemo(() => items.filter((item) => {
    const q = filters.search.toLowerCase();
    const matchesSearch =
    item.title.toLowerCase().includes(q) ||
    item.id.toLowerCase().includes(q) ||
    item.vendor && item.vendor.toLowerCase().includes(q) ||
    item.department && item.department.toLowerCase().includes(q);

    const matchesStatus = filters.status === 'All' || item.status === filters.status;
    const matchesPriority = filters.priority === 'All' || item.priority === filters.priority;
    const matchesDept = !filters.department || item.department === filters.department;

    const itemDate = item.requestedDate;
    const matchesStartDate = !filters.startDate || itemDate >= filters.startDate;
    const matchesEndDate = !filters.endDate || itemDate <= filters.endDate;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority &&
      matchesDept &&
      matchesStartDate &&
      matchesEndDate);

  }), [items, filters]);

  const canApprove = user?.role === 'Procurement Manager';

  const canEdit = (item) =>
  user?.role === 'Administrator' || canApprove || item?.requestedById === user?.id;


  const loadAll = useCallback(() => dispatch(fetchProcurements()), [dispatch]);

  const loadById = useCallback(
    (id) => dispatch(fetchProcurementById(id)),
    [dispatch]
  );

  const submitCreate = useCallback(
    async (data) => {
      const payload = {
        ...data,
        id: data.id || `PR-${Date.now()}`,
        requestedBy: user?.name || 'System User',
        requestedById: user?.id || 'u001',
        department: data.department || user?.department || 'Operations',
        status: 'Draft',
        requestedDate: new Date().toISOString().split('T')[0],
        lastUpdated: new Date().toISOString().split('T')[0],
        attachments: data.attachment ? [data.attachment] : [],
        attachmentFile: data.attachmentFile || null,
        notes: data.notes || ''
      };
      const result = await dispatch(createProcurement(payload));
      if (createProcurement.fulfilled.match(result)) {
        dispatch(
          showSnackbar({
            message: 'Procurement request saved successfully.',
            severity: 'success'
          })
        );
        navigate(ROUTES.PROCUREMENT, { state: { myRequests: true } });
        return true;
      }
      dispatch(showSnackbar({ message: 'Submission failed. Please try again.', severity: 'error' }));
      return false;
    },
    [dispatch, navigate, user]
  );

  const submitUpdate = useCallback(
    async (id, data) => {
      const result = await dispatch(updateProcurement({ id, data }));
      if (updateProcurement.fulfilled.match(result)) {
        dispatch(
          showSnackbar({
            message: `Procurement request ${id} updated successfully.`,
            severity: 'success'
          })
        );
        navigate(ROUTES.PROCUREMENT);
        return true;
      }
      dispatch(showSnackbar({ message: 'Update failed. Please try again.', severity: 'error' }));
      return false;
    },
    [dispatch, navigate]
  );

  const submitDelete = useCallback(
    async (id) => {
      const result = await dispatch(deleteProcurement(id));
      if (deleteProcurement.fulfilled.match(result)) {
        dispatch(
          showSnackbar({
            message: `Request ${id} deleted successfully.`,
            severity: 'success'
          })
        );
        return true;
      }
      return false;
    },
    [dispatch]
  );

  const submitApproval = useCallback(
    async (id, status, decisionDetails = {}) => {
      const auditAction = status;
      const current = items.find((i) => i.id === id) || selected;
      const reason = decisionDetails.reason?.trim() || '';
      const comments = decisionDetails.comments?.trim() || '';

      if (status === 'Rejected' && !reason) {
        dispatch(showSnackbar({ message: 'A rejection reason is required.', severity: 'error' }));
        return false;
      }

      if (status === 'Revision Required' && !comments) {
        dispatch(showSnackbar({ message: 'Revision comments are required.', severity: 'error' }));
        return false;
      }

      const updatedAuditLog = [
      ...(current?.auditLog || []),
      {
        action: auditAction,
        by: user?.name || 'System User',
        date: new Date().toISOString(),
        note: reason || comments || null
      }];

      const isApproved = status === 'Approved';
      const isRejected = status === 'Rejected';
      const isRevisionRequired = status === 'Revision Required';
      const result = await dispatch(
        updateProcurement({
          id,
          data: {
            status,
            reviewedBy: user?.name || 'System User',
            reviewedDate: new Date().toISOString().split('T')[0],
            approvedBy: isApproved ? user?.name : null,
            approvedDate: isApproved ? new Date().toISOString().split('T')[0] : null,
            rejectedBy: isRejected ? user?.name : null,
            rejectedDate: isRejected ? new Date().toISOString().split('T')[0] : null,
            rejectionReason: isRejected ? reason : null,
            revisionRequestedBy: isRevisionRequired ? user?.name : null,
            revisionRequestedDate: isRevisionRequired ? new Date().toISOString().split('T')[0] : null,
            revisionComments: isRevisionRequired ? comments : null,
            auditLog: updatedAuditLog,
            lastUpdated: new Date().toISOString().split('T')[0]
          }
        })
      );
      if (updateProcurement.fulfilled.match(result)) {
        const message =
        status === 'Approved' ?
        `Requisition ${id} has been approved.` :
        status === 'Rejected' ?
        `Requisition ${id} has been rejected.` :
        `Requisition ${id} was sent back for revision.`;
        dispatch(
          showSnackbar({
            message,
            severity: isApproved ? 'success' : isRejected ? 'error' : 'warning'
          })
        );
        return true;
      }
      return false;
    },
    [dispatch, items, selected, user]
  );

  const postComment = useCallback(
    async (id, text) => {
      if (!text?.trim()) return false;
      const result = await dispatch(
        addComment({ id, comment: { author: user?.name || 'System User', text: text.trim() } })
      );
      if (addComment.fulfilled.match(result)) {
        dispatch(showSnackbar({ message: 'Comment posted.', severity: 'success' }));
        return true;
      }
      return false;
    },
    [dispatch, user]
  );

  const updateFilters = useCallback(
    (updates) => dispatch(setFilters(updates)),
    [dispatch]
  );

  const resetSelected = useCallback(() => dispatch(clearSelected()), [dispatch]);

  const updatePagination = useCallback(
    (updates) => dispatch(setPagination(updates)),
    [dispatch]
  );

  return {

    items,
    filteredItems,
    selected,
    loading,
    error,
    filters,
    pagination,
    user,
    canApprove,
    canEdit,

    loadAll,
    loadById,
    submitCreate,
    submitUpdate,
    submitDelete,
    submitApproval,
    postComment,
    updateFilters,
    resetSelected,
    updatePagination
  };
}