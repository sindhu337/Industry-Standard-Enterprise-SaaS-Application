


import {
  Box,
  TextField,
  MenuItem,
  InputAdornment,
  Tooltip,
  IconButton } from
'@mui/material';
import {
  Search as SearchIcon,
  FilterAltOff as ClearIcon } from
'@mui/icons-material';

import {
  PROCUREMENT_STATUSES,
  PROCUREMENT_PRIORITIES,
  PROCUREMENT_DEPARTMENTS } from
'../data/procurementMockData';

export default function ProcurementFilters({ filters, onFilterChange }) {
  const isDirty =
  filters.search ||
  filters.status !== 'All' ||
  filters.priority !== 'All' ||
  filters.department ||
  filters.startDate ||
  filters.endDate;

  const handleClear = () =>
  onFilterChange({
    search: '',
    status: 'All',
    priority: 'All',
    department: '',
    startDate: '',
    endDate: ''
  });

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
      
      {}
      <TextField
        size="small"
        placeholder="Search by title, ID, vendor, department…"
        value={filters.search}
        onChange={(e) => onFilterChange({ search: e.target.value })}
        slotProps={{
          input: {
            startAdornment:
            <InputAdornment position="start">
                <SearchIcon fontSize="small" color="action" />
              </InputAdornment>

          }
        }}
        sx={{ flexGrow: 1, minWidth: 260 }}
        id="procurement-search" />
      

      {}
      <TextField
        select
        size="small"
        label="Status"
        value={filters.status}
        onChange={(e) => onFilterChange({ status: e.target.value })}
        sx={{ minWidth: 160 }}
        id="procurement-filter-status">
        
        {PROCUREMENT_STATUSES.map((s) =>
        <MenuItem key={s} value={s}>
            {s === 'All' ? 'All Statuses' : s}
          </MenuItem>
        )}
      </TextField>

      {}
      <TextField
        select
        size="small"
        label="Priority"
        value={filters.priority}
        onChange={(e) => onFilterChange({ priority: e.target.value })}
        sx={{ minWidth: 150 }}
        id="procurement-filter-priority">
        
        {PROCUREMENT_PRIORITIES.map((p) =>
        <MenuItem key={p} value={p}>
            {p === 'All' ? 'All Priorities' : p}
          </MenuItem>
        )}
      </TextField>

      {}
      <TextField
        select
        size="small"
        label="Department"
        value={filters.department || ''}
        onChange={(e) => onFilterChange({ department: e.target.value })}
        sx={{ minWidth: 160 }}
        id="procurement-filter-dept">
        
        <MenuItem value="">All Departments</MenuItem>
        {PROCUREMENT_DEPARTMENTS.map((d) =>
        <MenuItem key={d} value={d}>
            {d}
          </MenuItem>
        )}
      </TextField>

      {}
      <TextField
        size="small"
        type="date"
        label="From Date"
        slotProps={{ inputLabel: { shrink: true } }}
        value={filters.startDate || ''}
        onChange={(e) => onFilterChange({ startDate: e.target.value })}
        sx={{ minWidth: 150 }}
        id="procurement-filter-start-date" />
      

      {}
      <TextField
        size="small"
        type="date"
        label="To Date"
        slotProps={{ inputLabel: { shrink: true } }}
        value={filters.endDate || ''}
        onChange={(e) => onFilterChange({ endDate: e.target.value })}
        sx={{ minWidth: 150 }}
        id="procurement-filter-end-date" />
      

      {}
      {isDirty &&
      <Tooltip title="Clear all filters">
          <IconButton
          size="small"
          onClick={handleClear}
          color="error"
          id="procurement-clear-filters">
          
            <ClearIcon />
          </IconButton>
        </Tooltip>
      }
    </Box>);

}