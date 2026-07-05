import { createTheme } from '@mui/material/styles'

const baseTypography = {
  fontFamily: '"Inter", "Roboto", "Helvetica Neue", Arial, sans-serif',
  h1: { fontSize: '2rem', fontWeight: 700 },
  h2: { fontSize: '1.75rem', fontWeight: 700 },
  h3: { fontSize: '1.5rem', fontWeight: 600 },
  h4: { fontSize: '1.25rem', fontWeight: 600 },
  h5: { fontSize: '1.1rem', fontWeight: 600 },
  h6: { fontSize: '1rem', fontWeight: 600 },
  subtitle1: { fontSize: '0.95rem', fontWeight: 500 },
  subtitle2: { fontSize: '0.85rem', fontWeight: 500 },
  body1: { fontSize: '0.875rem' },
  body2: { fontSize: '0.8rem' },
  caption: { fontSize: '0.75rem' },
  button: { textTransform: 'none', fontWeight: 600, fontSize: '0.875rem' },
}

const baseComponents = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 10,
        minHeight: 42,
        padding: '10px 20px',
        boxShadow: 'none',
        fontWeight: 600,
        '&:hover': { boxShadow: '0 6px 16px rgba(0,0,0,0.08)' },
        '&.Mui-disabled': { opacity: 0.65 },
      },
      sizeSmall: {
        minHeight: 34,
        padding: '7px 16px',
      },
      sizeLarge: {
        minHeight: 48,
        padding: '12px 24px',
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 14,
        boxShadow: '0 12px 32px rgba(15, 23, 42, 0.08)',
        border: '1px solid rgba(145, 158, 171, 0.16)',
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: 14,
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 6,
        fontWeight: 700,
        fontSize: '0.75rem',
        height: 28,
      },
    },
  },
  MuiTableHead: {
    styleOverrides: {
      root: {
        '& .MuiTableCell-head': {
          fontWeight: 700,
          fontSize: '0.8rem',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
        },
      },
    },
  },
  MuiTableCell: {
    styleOverrides: {
      root: {
        borderBottom: '1px solid rgba(224, 231, 239, 1)',
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: 12,
        backgroundColor: '#F7F9FC',
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: '#1976d2',
        },
      },
      input: {
        padding: '14px 16px',
      },
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: {
        fontWeight: 600,
      },
    },
  },
  MuiFormHelperText: {
    styleOverrides: {
      root: {
        marginTop: 4,
      },
    },
  },
  MuiTabs: {
    styleOverrides: {
      root: {
        minHeight: 48,
      },
      indicator: {
        height: 4,
        borderRadius: 2,
      },
    },
  },
  MuiTab: {
    styleOverrides: {
      root: {
        textTransform: 'none',
        minHeight: 48,
        fontWeight: 700,
        borderRadius: 10,
      },
    },
  },
  MuiListItemButton: {
    styleOverrides: {
      root: {
        minHeight: 52,
        borderRadius: 10,
        '&.Mui-selected': {
          bgcolor: 'rgba(21, 101, 192, 0.08)',
          '&:hover': {
            bgcolor: 'rgba(21, 101, 192, 0.12)',
          },
        },
      },
    },
  },
  MuiDataGrid: {
    styleOverrides: {
      root: {
        border: '1px solid rgba(224, 231, 239, 1)',
        borderRadius: 14,
        overflow: 'hidden',
      },
      columnHeaders: {
        backgroundColor: '#F7F9FC',
        color: '#374151',
        fontWeight: 700,
      },
      row: {
        '&:hover': {
          backgroundColor: '#F3F7FB',
        },
      },
    },
  },
}

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1565C0', light: '#1976D2', dark: '#0D47A1', contrastText: '#fff' },
    secondary: { main: '#0288D1', light: '#039BE5', dark: '#0277BD', contrastText: '#fff' },
    success: { main: '#2E7D32', light: '#388E3C', dark: '#1B5E20' },
    warning: { main: '#F57C00', light: '#FB8C00', dark: '#E65100' },
    error: { main: '#C62828', light: '#D32F2F', dark: '#B71C1C' },
    info: { main: '#0277BD', light: '#0288D1', dark: '#01579B' },
    background: { default: '#F4F6F9', paper: '#FFFFFF' },
    text: { primary: '#1A2332', secondary: '#546E7A', disabled: '#90A4AE' },
    divider: '#E0E7EF',
    grey: {
      50: '#F8FAFC', 100: '#F1F5F9', 200: '#E2E8F0',
      300: '#CBD5E1', 400: '#94A3B8', 500: '#64748B',
    },
  },
  typography: baseTypography,
  shape: { borderRadius: 8 },
  components: {
    ...baseComponents,
    MuiAppBar: {
      styleOverrides: {
        root: { backgroundColor: '#FFFFFF', color: '#1A2332', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: { backgroundColor: '#1A2332', color: '#E8EDF3' },
      },
    },
  },
})

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#42A5F5', light: '#64B5F6', dark: '#1E88E5', contrastText: '#fff' },
    secondary: { main: '#29B6F6', light: '#4FC3F7', dark: '#0288D1', contrastText: '#fff' },
    success: { main: '#66BB6A', light: '#81C784', dark: '#388E3C' },
    warning: { main: '#FFA726', light: '#FFB74D', dark: '#F57C00' },
    error: { main: '#EF5350', light: '#E57373', dark: '#C62828' },
    info: { main: '#29B6F6', light: '#4FC3F7', dark: '#0288D1' },
    background: { default: '#0F1724', paper: '#1A2332' },
    text: { primary: '#E8EDF3', secondary: '#90A4AE', disabled: '#546E7A' },
    divider: '#263245',
  },
  typography: baseTypography,
  shape: { borderRadius: 8 },
  components: {
    ...baseComponents,
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
          backgroundImage: 'none',
          border: '1px solid #263245',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none', border: '1px solid #263245' },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: { backgroundColor: '#1A2332', boxShadow: '0 1px 4px rgba(0,0,0,0.3)' },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: { backgroundColor: '#111827', color: '#E8EDF3' },
      },
    },
  },
})
