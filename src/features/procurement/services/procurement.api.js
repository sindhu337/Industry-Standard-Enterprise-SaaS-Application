




import { PROCUREMENT_MOCK_DATA } from '../data/procurementMockData';

const delay = (ms = 400) => new Promise((res) => setTimeout(res, ms));


let _store = [...PROCUREMENT_MOCK_DATA];

export const procurementApi = {



  async getAll() {
    await delay(500);
    return [..._store];
  },




  async getById(id) {
    await delay(250);
    const item = _store.find((r) => r.id === id);
    if (!item) throw new Error(`Procurement request ${id} not found`);
    return { ...item };
  },




  async create(data) {
    await delay(400);
    const newId = `PR-${new Date().getFullYear()}-${String(Math.floor(100 + Math.random() * 900))}`;
    const newRequest = {
      id: newId,
      ...data,
      status: 'Pending Approval',
      requestedDate: new Date().toISOString().split('T')[0],
      approvedBy: null,
      approvedDate: null,
      comments: [],
      attachments: [],
      auditLog: [
      {
        action: 'Created',
        by: data.requestedBy || 'System User',
        date: new Date().toISOString()
      },
      {
        action: 'Submitted for Approval',
        by: data.requestedBy || 'System User',
        date: new Date().toISOString()
      }]

    };
    _store = [newRequest, ..._store];
    return { ...newRequest };
  },




  async update(id, data) {
    await delay(400);
    const idx = _store.findIndex((r) => r.id === id);
    if (idx === -1) throw new Error(`Procurement request ${id} not found`);
    _store[idx] = { ..._store[idx], ...data };
    return { ..._store[idx] };
  },




  async delete(id) {
    await delay(300);
    const exists = _store.some((r) => r.id === id);
    if (!exists) throw new Error(`Procurement request ${id} not found`);
    _store = _store.filter((r) => r.id !== id);
    return id;
  },




  async addComment(id, comment) {
    await delay(200);
    const idx = _store.findIndex((r) => r.id === id);
    if (idx === -1) throw new Error(`Procurement request ${id} not found`);
    const newComment = {
      ...comment,
      date: new Date().toISOString().split('T')[0]
    };
    _store[idx].comments = [...(_store[idx].comments || []), newComment];
    return { id, comment: newComment };
  },




  async updateStatus(id, status, approver) {
    await delay(400);
    const auditAction = status === 'Approved' ? 'Approved' : status === 'Rejected' ? 'Rejected' : status;
    const update = {
      status,
      ...(status === 'Approved' && { approvedBy: approver, approvedDate: new Date().toISOString().split('T')[0] }),
      auditLog: [
      ...(_store.find((r) => r.id === id)?.auditLog || []),
      { action: auditAction, by: approver, date: new Date().toISOString() }]

    };
    return this.update(id, update);
  }
};