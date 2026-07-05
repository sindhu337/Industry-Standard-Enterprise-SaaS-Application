import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PROCUREMENT_MOCK_DATA } from '@/features/procurement/data/procurementMockData';

const simulateDelay = (ms = 500) => new Promise((res) => setTimeout(res, ms));
const STORAGE_KEY = 'egrcp_procurements';

const readStoredProcurements = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

const persistProcurements = (items) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {

  }
};

const getInitialItems = () => {
  const stored = readStoredProcurements();
  return Array.isArray(stored) && stored.length > 0 ? stored : PROCUREMENT_MOCK_DATA;
};

export const fetchProcurements = createAsyncThunk('procurement/fetchAll', async (_, { getState }) => {
  await simulateDelay();
  const { procurement } = getState();
  if (procurement.items.length > 0) {
    return procurement.items;
  }
  return PROCUREMENT_MOCK_DATA;
});

export const fetchProcurementById = createAsyncThunk('procurement/fetchById', async (id, { getState }) => {
  await simulateDelay(200);
  const { procurement } = getState();
  const items = procurement.items.length > 0 ? procurement.items : PROCUREMENT_MOCK_DATA;
  return items.find((item) => item.id === id) || null;
});

export const createProcurement = createAsyncThunk('procurement/create', async (data) => {
  await simulateDelay(400);
  const newRequest = {
    id: data.id || `PR-2025-${Math.floor(100 + Math.random() * 900)}`,
    ...data,
    status: data.status || 'Draft',
    requestedDate: data.requestedDate || new Date().toISOString().split('T')[0],
    comments: [],
    attachments: data.attachments || [],
    auditLog: [
    {
      action: 'Created',
      by: data.requestedBy || 'System User',
      date: new Date().toISOString()
    }]

  };
  return newRequest;
});

export const updateProcurement = createAsyncThunk('procurement/update', async ({ id, data }) => {
  await simulateDelay(400);
  return { id, data };
});

export const deleteProcurement = createAsyncThunk('procurement/delete', async (id) => {
  await simulateDelay(300);
  return id;
});

export const addComment = createAsyncThunk('procurement/addComment', async ({ id, comment }) => {
  await simulateDelay(200);
  return { id, comment };
});

const procurementSlice = createSlice({
  name: 'procurement',
  initialState: {
    items: getInitialItems(),
    selected: null,
    loading: false,
    error: null,
    pagination: { page: 0, pageSize: 10 },
    filters: { search: '', status: 'All', priority: 'All', department: '', startDate: '', endDate: '' }
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearSelected: (state) => {
      state.selected = null;
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    }
  },
  extraReducers: (builder) => {
    builder.
    addCase(fetchProcurements.pending, (state) => {
      state.loading = true;
      state.error = null;
    }).
    addCase(fetchProcurements.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
    }).
    addCase(fetchProcurements.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    }).
    addCase(fetchProcurementById.pending, (state) => {
      state.loading = true;
      state.error = null;
    }).
    addCase(fetchProcurementById.fulfilled, (state, action) => {
      state.loading = false;
      state.selected = action.payload;
    }).
    addCase(createProcurement.fulfilled, (state, action) => {
      state.items.unshift(action.payload);
      persistProcurements(state.items);
    }).
    addCase(updateProcurement.fulfilled, (state, action) => {
      const idx = state.items.findIndex((i) => i.id === action.payload.id);
      if (idx !== -1) {
        state.items[idx] = { ...state.items[idx], ...action.payload.data };
      }
      if (state.selected && state.selected.id === action.payload.id) {
        state.selected = { ...state.selected, ...action.payload.data };
      }
      persistProcurements(state.items);
    }).
    addCase(deleteProcurement.fulfilled, (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
      if (state.selected && state.selected.id === action.payload) {
        state.selected = null;
      }
      persistProcurements(state.items);
    }).
    addCase(addComment.fulfilled, (state, action) => {
      const idx = state.items.findIndex((i) => i.id === action.payload.id);
      const newComment = {
        author: action.payload.comment.author,
        text: action.payload.comment.text,
        date: new Date().toISOString().split('T')[0]
      };
      if (idx !== -1) {
        state.items[idx].comments = [...(state.items[idx].comments || []), newComment];
      }
      if (state.selected && state.selected.id === action.payload.id) {
        state.selected.comments = [...(state.selected.comments || []), newComment];
      }
    });
  }
});

export const { setFilters, clearSelected, setPagination } = procurementSlice.actions;
export default procurementSlice.reducer;