import { createTheme, alpha } from '@mui/material/styles'

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
        borderRadius: 6,
        minHeight: 40,
        padding: '8px 18px',
        boxShadow: 'none',
        fontWeight: 600,
        '&:hover': { boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
        '&.Mui-disabled': { opacity: 0.65 },
      },
      sizeSmall: { minHeight: 32, padding: '6px 14px' },
      sizeLarge: { minHeight: 46, padding: '10px 22px' },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: { borderRadius: 8 },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: { borderRadius: 8 },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: { borderRadius: 4, fontWeight: 700, fontSize: '0.75rem', height: 26 },
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
  MuiOutlinedInput: {
    styleOverrides: {
      root: { borderRadius: 6 },
      input: { padding: '12px 14px' },
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: { fontWeight: 600 },
      outlined: {
        '&:not(.MuiInputLabel-shrink)': {
          transform: 'translate(14px, 12px) scale(1)',
        }
      }
    },
  },
  MuiFormHelperText: {
    styleOverrides: {
      root: { marginTop: 4 },
    },
  },
  MuiTabs: {
    styleOverrides: {
      root: { minHeight: 44 },
      indicator: { height: 3, borderRadius: 1 },
    },
  },
  MuiTab: {
    styleOverrides: {
      root: { textTransform: 'none', minHeight: 44, fontWeight: 700 },
    },
  },
  MuiListItemButton: {
    styleOverrides: {
      root: {
        minHeight: 44,
        borderRadius: 4,
      },
    },
  },
  MuiDialog: {
    styleOverrides: {
      paper: { borderRadius: 8 },
    },
  },
  MuiMenu: {
    styleOverrides: {
      paper: { borderRadius: 6 },
    },
  },
  MuiPopover: {
    styleOverrides: {
      paper: { borderRadius: 6 },
    },
  },
  MuiAlert: {
    styleOverrides: {
      root: { borderRadius: 6 },
    },
  },
}


export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#6366F1', light: '#818CF8', dark: '#4338CA', contrastText: '#fff' },
    secondary: { main: '#10B981', light: '#34D399', dark: '#059669', contrastText: '#fff' },
    success: { main: '#10B981', light: '#34D399', dark: '#059669' },
    warning: { main: '#F79009', light: '#FDB022', dark: '#B54708' },
    error: { main: '#F04438', light: '#FDA29B', dark: '#B42318' },
    info: { main: '#06AED4', light: '#67E8F9', dark: '#0E7090' },
    background: { default: '#F9FAFB', paper: '#FFFFFF' },
    text: { primary: '#111927', secondary: '#6C737F', disabled: '#9DA4AE' },
    divider: '#F2F4F7',
    grey: {
      50: '#F9FAFB', 100: '#F3F4F6', 200: '#E5E7EB',
      300: '#D1D5DB', 400: '#9CA3AF', 500: '#6B7280',
    },
  },
  typography: baseTypography,
  shape: { borderRadius: 6 },
  components: {
    ...baseComponents,
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          backgroundColor: '#FFFFFF',
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#6366F1' },
        },
        input: { padding: '12px 14px' },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: { borderBottom: '1px solid #F2F4F7' },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
          border: '1px solid #F2F4F7',
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: '1px solid #F2F4F7',
          borderRadius: 6,
          overflow: 'hidden',
        },
        columnHeaders: {
          backgroundColor: '#F9FAFB',
          color: '#6C737F',
          fontWeight: 600,
        },
        row: { '&:hover': { backgroundColor: '#F9FAFB' } },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          color: '#111927',
          boxShadow: 'none',
          borderBottom: '1px dashed #F2F4F7',
          borderRadius: 0,
        },
      },
    },
    
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#FFFFFF',
          color: '#111927',
          borderRight: '1px dashed #F2F4F7',
          borderRadius: 0,
        },
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
  shape: { borderRadius: 6 },
  components: {
    ...baseComponents,
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          backgroundColor: 'rgba(255,255,255,0.04)',
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#42A5F5' },
        },
        input: { padding: '12px 14px' },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: { borderBottom: '1px solid #263245' },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
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
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: '1px solid #263245',
          borderRadius: 6,
          overflow: 'hidden',
        },
        columnHeaders: {
          backgroundColor: '#1A2332',
          color: '#E8EDF3',
          fontWeight: 700,
        },
        row: { '&:hover': { backgroundColor: 'rgba(255,255,255,0.04)' } },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1A2332',
          boxShadow: 'none',
          borderBottom: '1px solid #263245',
          borderRadius: 0,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#111827',
          color: '#E8EDF3',
          borderRight: '1px solid #263245',
          borderRadius: 0,
        },
      },
    },
  },
})
