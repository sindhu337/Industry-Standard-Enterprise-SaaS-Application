import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Link,
  InputAdornment,
  IconButton,
  CircularProgress,
  FormControlLabel,
  Checkbox,
  Grid,
  Stack,
  useTheme,
  alpha,
  Divider,
} from '@mui/material'
import {
  Visibility,
  VisibilityOff,
  LockOutlined,
  EmailOutlined,
  PersonOutlined,
  LocalShippingOutlined,
  VerifiedUserOutlined,
  BalanceOutlined,
  AdminPanelSettingsOutlined,
} from '@mui/icons-material'
import { motion } from 'framer-motion'
import AppLogo from '@/components/common/AppLogo'

import { loginUser, clearError } from '@/features/auth/authSlice'
import { showSnackbar } from '@/app/store/slices/uiSlice'
import { ROUTES } from '@/constants/routes'
import { ROLES } from '@/constants/roles'
import { APP_CONFIG } from '@/constants/appConfig'
import { loginSchema } from '@/validations/auth.validation'

const DEMO_USERS = [
  {
    role: 'Administrator',
    email: 'alice@egrcp.com',
    password: 'Admin@1234',
    icon: AdminPanelSettingsOutlined,
    color: '#e0f2fe',
    textColor: '#0369a1',
  },
  {
    role: 'Procurement Manager',
    email: 'carol@egrcp.com',
    password: 'Proc@1234',
    icon: LocalShippingOutlined,
    color: '#f0fdf4',
    textColor: '#15803d',
  },
  {
    role: 'Compliance Officer',
    email: 'david@egrcp.com',
    password: 'Comp@1234',
    icon: VerifiedUserOutlined,
    color: '#fdf2f8',
    textColor: '#be185d',
  },
  {
    role: 'Auditor',
    email: 'eva@egrcp.com',
    password: 'Audit@1234',
    icon: BalanceOutlined,
    color: '#fef3c7',
    textColor: '#b45309',
  },
  {
    role: 'Employee',
    email: 'bob@egrcp.com',
    password: 'Emp@1234',
    icon: PersonOutlined,
    color: '#faf5ff',
    textColor: '#7e22ce',
  },
]

export default function LoginPage() {
  const theme = useTheme()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading } = useSelector((state) => state.auth)
  const [showPassword, setShowPassword] = useState(false)

  const savedEmail = localStorage.getItem('egrcp_remember_email') || ''

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: savedEmail,
      password: '',
      rememberMe: Boolean(savedEmail),
    },
  })

  useEffect(() => {
    dispatch(clearError())
  }, [dispatch])

  const onSubmit = async (data) => {
    dispatch(clearError())
    const result = await dispatch(loginUser({ email: data.email, password: data.password }))
    if (loginUser.fulfilled.match(result)) {
      if (data.rememberMe) {
        localStorage.setItem('egrcp_remember_email', data.email)
      } else {
        localStorage.removeItem('egrcp_remember_email')
      }
      dispatch(showSnackbar({ message: 'Welcome back! Login successful.', severity: 'success' }))
      navigate(ROUTES.DASHBOARD, { replace: true })
    } else {
      dispatch(showSnackbar({ message: result.payload || 'Login failed.', severity: 'error' }))
    }
  }

  const handleQuickLogin = (email, password) => {
    setValue('email', email)
    setValue('password', password)
    setValue('rememberMe', true)
    onSubmit({ email, password, rememberMe: true })
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', bgcolor: 'background.default' }}>
      
      {}
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          justifyContent: 'space-between',
          p: 6,
          background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 50%, ${theme.palette.primary.light} 100%)`,
          color: '#fff',
          position: 'relative',
          overflow: 'hidden',
          width: { md: '41.6%', lg: '50%' }
        }}
      >
        {}
        <Box
          sx={{
            position: 'absolute',
            top: '-20%',
            right: '-20%',
            width: '80%',
            height: '80%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%)',
            filter: 'blur(40px)',
          }}
        />

        <Stack spacing={2} direction="row" alignItems="center" >
          <AppLogo width={120} />
        </Stack>

        <Box sx={{ zIndex: 1, my: 'auto', maxWidth: 480 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography variant="h2" fontWeight={800} gutterBottom sx={{ fontSize: { md: '2.5rem', lg: '3.5rem' }, lineHeight: 1.1 }}>
              Secure Enterprise Operations.
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.85)', mb: 4, lineHeight: 1.7, fontSize: '1.1rem' }}>
              Connect procurement workflows, manage compliance policies, resolve audits, and oversee risks under a single role-based access control system.
            </Typography>
          </motion.div>

          <Stack spacing={3} sx={{ mt: 2 }}>
            {[
              'Comprehensive Auditor and Compliance dashboards.',
              'Automated procurement tracking and workflow handoffs.',
              'Granular, secure, and fully audited access control.',
            ].map((text, i) => (
              <Stack key={i} direction="row" spacing={1.5} alignItems="center">
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: 'secondary.main',
                  }}
                />
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                  {text}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Box>

        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)', zIndex: 1 }}>
          © {new Date().getFullYear()} e-GRCP. All rights reserved.
        </Typography>
      </Box>

      {}
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: { xs: 3, md: 6 },
          width: { xs: '100%', md: '58.4%', lg: '50%' }
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 440 }}>
          
          <Box sx={{ mb: 4, display: { xs: 'block', md: 'none' }, textAlign: 'center' }}>
            <Stack direction="row" spacing={1.5} alignItems="center" justifyContent="center" sx={{ mb: 2 }}>
              <AppLogo width={42} />
              <Typography variant="h5" fontWeight={800}>{APP_CONFIG.APP_NAME}</Typography>
            </Stack>
          </Box>

          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider',
              bgcolor: 'background.paper',
            }}
          >
            <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
              <Typography variant="h5" fontWeight={800} gutterBottom sx={{ letterSpacing: '-0.5px' }}>
                Sign In
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                Enter your credentials or select a demo role below.
              </Typography>

              <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                <TextField
                  {...register('email')}
                  label="Email Address"
                  type="email"
                  fullWidth
                  required
                  error={Boolean(errors.email)}
                  helperText={errors.email?.message}
                  disabled={loading}
                  sx={{ mb: 2.5 }}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailOutlined fontSize="small" color="action" />
                        </InputAdornment>
                      ),
                    },
                  }}
                />

                <TextField
                  {...register('password')}
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  fullWidth
                  required
                  error={Boolean(errors.password)}
                  helperText={errors.password?.message}
                  disabled={loading}
                  sx={{ mb: 2 }}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlined fontSize="small" color="action" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                            size="small"
                          >
                            {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                  <FormControlLabel
                    control={<Checkbox {...register('rememberMe')} color="primary" size="small" />}
                    label={<Typography variant="body2" color="text.secondary">Remember me</Typography>}
                  />
                  <Link
                    component={RouterLink}
                    to={ROUTES.FORGOT_PASSWORD}
                    variant="body2"
                    color="primary"
                    fontWeight={600}
                    underline="none"
                    sx={{ '&:hover': { color: 'primary.dark' } }}
                  >
                    Forgot password?
                  </Link>
                </Box>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{
                    py: 1.8,
                    borderRadius: 2,
                    fontWeight: 700,
                    boxShadow: 'none',
                    '&:hover': {
                      boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.25)}`
                    }
                  }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
                </Button>
              </Box>

              <Box sx={{ textAlign: 'center', mt: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  New to the platform?{' '}
                  <Link
                    component={RouterLink}
                    to={ROUTES.SIGNUP}
                    color="primary"
                    fontWeight={700}
                    underline="none"
                  >
                    Create Account
                  </Link>
                </Typography>
              </Box>
            </CardContent>
          </Card>

          {}
          <Card
            elevation={0}
            sx={{
              mt: 3,
              borderRadius: 3,
              border: '1px dashed',
              borderColor: 'primary.main',
              bgcolor: alpha(theme.palette.primary.main, 0.02),
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="subtitle2" fontWeight={800} color="primary.main" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                Demo Quick Login
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
                Click a role below to automatically fill credentials and sign in.
              </Typography>

              <Grid container spacing={1}>
                {DEMO_USERS.map((demo) => {
                  const Icon = demo.icon
                  return (
                    <Grid size={{ xs: 6, sm: 6, md: 12 }} key={demo.role}>
                      <Button
                        fullWidth
                        variant="outlined"
                        onClick={() => handleQuickLogin(demo.email, demo.password)}
                        disabled={loading}
                        sx={{
                          justifyContent: 'flex-start',
                          py: 1,
                          px: 2,
                          borderRadius: 2,
                          textTransform: 'none',
                          borderColor: alpha(theme.palette.divider, 0.8),
                          color: 'text.primary',
                          bgcolor: 'background.paper',
                          '&:hover': {
                            bgcolor: demo.color,
                            borderColor: demo.textColor,
                            color: demo.textColor,
                          },
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1.5,
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            p: 0.5,
                            borderRadius: 1,
                            bgcolor: alpha(theme.palette.action.disabledBackground, 0.1),
                            color: 'inherit',
                          }}
                        >
                          <Icon fontSize="small" />
                        </Box>
                        <Stack spacing={0} alignItems="flex-start" sx={{ textAlign: 'left' }}>
                          <Typography variant="caption" fontWeight={700}>
                            {demo.role}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ opacity: 0.7, fontSize: '10px' }}>
                            {demo.email.split('@')[0]}
                          </Typography>
                        </Stack>
                      </Button>
                    </Grid>
                  )
                })}
              </Grid>
            </CardContent>
          </Card>

        </Box>
      </Box>

    </Box>
  )
}
