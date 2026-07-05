/**
 * useProcurement – Custom hook
 * Centralizes all procurement state access and action dispatching.
 */
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {
  fetchProcurements,
  fetchProcurementById,
  createProcurement,
  updateProcurement,
  deleteProcurement,
  addComment,
  setFilters,
  clearSelected,
  setPagination,
} from '../procurementSlice'
import { showSnackbar } from '@/app/store/slices/uiSlice'
import { ROUTES } from '@/constants/routes'

export function useProcurement() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { items, selected, loading, error, filters, pagination } = useSelector(
    (state) => state.procurement,
  )
  const { user } = useSelector((state) => state.auth)

  // ─── Derived / computed ──────────────────────────────────────────────────
  const filteredItems = items.filter((item) => {
    const q = filters.search.toLowerCase()
    const matchesSearch =
      item.title.toLowerCase().includes(q) ||
      item.id.toLowerCase().includes(q) ||
      (item.vendor && item.vendor.toLowerCase().includes(q)) ||
      (item.requestedBy && item.requestedBy.toLowerCase().includes(q))

    const matchesStatus = filters.status === 'All' || item.status === filters.status
    const matchesPriority = filters.priority === 'All' || item.priority === filters.priority
    const matchesDept = !filters.department || item.department === filters.department

    return matchesSearch && matchesStatus && matchesPriority && matchesDept
  })

  const canApprove =
    user?.role === 'Administrator' || user?.role === 'Procurement Manager'

  const canEdit = (item) =>
    canApprove || item?.requestedById === user?.id

  // ─── Actions ─────────────────────────────────────────────────────────────
  const loadAll = useCallback(() => dispatch(fetchProcurements()), [dispatch])

  const loadById = useCallback(
    (id) => dispatch(fetchProcurementById(id)),
    [dispatch],
  )

  const submitCreate = useCallback(
    async (data) => {
      const payload = {
        ...data,
        requestedBy: user?.name || 'System User',
        requestedById: user?.id || 'u001',
        department: user?.department || 'Operations',
      }
      const result = await dispatch(createProcurement(payload))
      if (createProcurement.fulfilled.match(result)) {
        dispatch(
          showSnackbar({
            message: 'Requisition submitted for approval successfully.',
            severity: 'success',
          }),
        )
        navigate(ROUTES.PROCUREMENT)
        return true
      }
      dispatch(showSnackbar({ message: 'Submission failed. Please try again.', severity: 'error' }))
      return false
    },
    [dispatch, navigate, user],
  )

  const submitUpdate = useCallback(
    async (id, data) => {
      const result = await dispatch(updateProcurement({ id, data }))
      if (updateProcurement.fulfilled.match(result)) {
        dispatch(
          showSnackbar({
            message: `Procurement request ${id} updated successfully.`,
            severity: 'success',
          }),
        )
        navigate(ROUTES.PROCUREMENT)
        return true
      }
      dispatch(showSnackbar({ message: 'Update failed. Please try again.', severity: 'error' }))
      return false
    },
    [dispatch, navigate],
  )

  const submitDelete = useCallback(
    async (id) => {
      const result = await dispatch(deleteProcurement(id))
      if (deleteProcurement.fulfilled.match(result)) {
        dispatch(
          showSnackbar({
            message: `Request ${id} deleted successfully.`,
            severity: 'success',
          }),
        )
        return true
      }
      return false
    },
    [dispatch],
  )

  const submitApproval = useCallback(
    async (id, status) => {
      const auditAction = status === 'Approved' ? 'Approved' : 'Rejected'
      const current = items.find((i) => i.id === id) || selected
      const updatedAuditLog = [
        ...(current?.auditLog || []),
        { action: auditAction, by: user?.name || 'System User', date: new Date().toISOString() },
      ]
      const result = await dispatch(
        updateProcurement({
          id,
          data: {
            status,
            approvedBy: status === 'Approved' ? user?.name : null,
            approvedDate: status === 'Approved' ? new Date().toISOString().split('T')[0] : null,
            auditLog: updatedAuditLog,
          },
        }),
      )
      if (updateProcurement.fulfilled.match(result)) {
        dispatch(
          showSnackbar({
            message: `Requisition ${id} has been ${status.toLowerCase()}.`,
            severity: status === 'Approved' ? 'success' : 'warning',
          }),
        )
        return true
      }
      return false
    },
    [dispatch, items, selected, user],
  )

  const postComment = useCallback(
    async (id, text) => {
      if (!text?.trim()) return false
      const result = await dispatch(
        addComment({ id, comment: { author: user?.name || 'System User', text: text.trim() } }),
      )
      if (addComment.fulfilled.match(result)) {
        dispatch(showSnackbar({ message: 'Comment posted.', severity: 'success' }))
        return true
      }
      return false
    },
    [dispatch, user],
  )

  const updateFilters = useCallback(
    (updates) => dispatch(setFilters(updates)),
    [dispatch],
  )

  const resetSelected = useCallback(() => dispatch(clearSelected()), [dispatch])

  const updatePagination = useCallback(
    (updates) => dispatch(setPagination(updates)),
    [dispatch],
  )

  return {
    // State
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
    // Actions
    loadAll,
    loadById,
    submitCreate,
    submitUpdate,
    submitDelete,
    submitApproval,
    postComment,
    updateFilters,
    resetSelected,
    updatePagination,
  }
}
