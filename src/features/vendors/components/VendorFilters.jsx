import {
  Box, TextField, FormControl, InputLabel, Select, MenuItem,
  Button, InputAdornment, Stack,
} from '@mui/material'
import { Search as SearchIcon, FilterList as FilterIcon, Clear as ClearIcon } from '@mui/icons-material'
import { VENDOR_STATUSES, VENDOR_RISK_LEVELS, VENDOR_CATEGORIES } from '../data/vendorMockData'

export default function VendorFilters({ filters, onFilterChange }) {
  const hasActive = filters.search || (filters.status && filters.status !== 'All')
    || (filters.riskLevel && filters.riskLevel !== 'All')
    || (filters.category && filters.category !== 'All')

  const handleClear = () =>
    onFilterChange({ search: '', status: 'All', riskLevel: 'All', category: 'All' })

  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary', mr: 0.5 }}>
        <FilterIcon fontSize="small" />
      </Box>

      <TextField
        size="small"
        placeholder="Search vendors…"
        value={filters.search || ''}
        onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" color="action" />
            </InputAdornment>
          ),
        }}
        sx={{ minWidth: 220 }}
        id="vendor-search"
      />

      <FormControl size="small" sx={{ minWidth: 140 }}>
        <InputLabel id="vendor-status-label">Status</InputLabel>
        <Select
          labelId="vendor-status-label"
          label="Status"
          value={filters.status || 'All'}
          onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
          id="vendor-status-filter"
        >
          <MenuItem value="All">All Statuses</MenuItem>
          {VENDOR_STATUSES.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 140 }}>
        <InputLabel id="vendor-risk-label">Risk Level</InputLabel>
        <Select
          labelId="vendor-risk-label"
          label="Risk Level"
          value={filters.riskLevel || 'All'}
          onChange={(e) => onFilterChange({ ...filters, riskLevel: e.target.value })}
          id="vendor-risk-filter"
        >
          <MenuItem value="All">All Levels</MenuItem>
          {VENDOR_RISK_LEVELS.map((r) => <MenuItem key={r} value={r}>{r}</MenuItem>)}
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 160 }}>
        <InputLabel id="vendor-cat-label">Category</InputLabel>
        <Select
          labelId="vendor-cat-label"
          label="Category"
          value={filters.category || 'All'}
          onChange={(e) => onFilterChange({ ...filters, category: e.target.value })}
          id="vendor-category-filter"
        >
          <MenuItem value="All">All Categories</MenuItem>
          {VENDOR_CATEGORIES.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
        </Select>
      </FormControl>

      {hasActive && (
        <Button
          size="small"
          startIcon={<ClearIcon />}
          onClick={handleClear}
          id="btn-vendor-clear-filters"
          sx={{ fontWeight: 600 }}
        >
          Clear
        </Button>
      )}
    </Box>
  )
}
