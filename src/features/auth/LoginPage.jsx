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
} from '@mui/material'
import {
  Visibility,
  VisibilityOff,
  LockOutlined,
  EmailOutlined,
  ShieldOutlined,
} from '@mui/icons-material'

import { loginUser, clearError } from '@/features/auth/authSlice'
import { showSnackbar } from '@/app/store/slices/uiSlice'
import { ROUTES } from '@/constants/routes'
import { APP_CONFIG } from '@/constants/appConfig'
import { loginSchema } from '@/validations/auth.validation'

export default function LoginPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector((state) => state.auth)

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

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0D47A1 0%, #1565C0 40%, #0288D1 100%)',
        p: 2,
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 440 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 64,
              height: 64,
              borderRadius: '16px',
              bgcolor: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(10px)',
              mb: 2,
              border: '1px solid rgba(255,255,255,0.25)',
            }}
          >
            <ShieldOutlined sx={{ fontSize: 36, color: '#fff' }} />
          </Box>
          <Typography variant="h4" fontWeight={800} color="#fff" letterSpacing="-0.5px">
            {APP_CONFIG.APP_NAME}
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.75)', mt: 0.5 }}>
            {APP_CONFIG.APP_FULL_NAME}
          </Typography>
        </Box>

        <Card
          sx={{
            borderRadius: 3,
            boxShadow: '0 24px 64px rgba(0,0,0,0.25)',
            bgcolor: 'background.paper',
            border: 'none',
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h6" fontWeight={700} color="text.primary" gutterBottom>
              Sign in to your account
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Enter your credentials to access the platform
            </Typography>

            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
              <TextField
                {...register('email')}
                label="Email Address"
                type="email"
                fullWidth
                required
                autoComplete="email"
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
                autoComplete="current-password"
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
                disabled={loading}
                sx={{ mb: 1.5 }}
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
                          aria-label="toggle password visibility"
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
                  control={<Checkbox {...register('rememberMe')} color="primary" />}
                  label={<Typography variant="body2">Remember me</Typography>}
                />
                <Link
                  component={RouterLink}
                  to={ROUTES.FORGOT_PASSWORD}
                  variant="body2"
                  color="primary"
                  underline="hover"
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
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  background: 'linear-gradient(135deg, #1565C0, #0288D1)',
                  boxShadow: '0 4px 16px rgba(21, 101, 192, 0.4)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #0D47A1, #0277BD)',
                    boxShadow: '0 6px 20px rgba(21, 101, 192, 0.5)',
                  },
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
              </Button>
            </Box>

            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Typography variant="body2" color="text.secondary">
                Don&apos;t have an account?{' '}
                <Link
                  component={RouterLink}
                  to={ROUTES.SIGNUP}
                  color="primary"
                  fontWeight={600}
                  underline="hover"
                >
                  Create Account
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>

        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
            Demo credentials — alice@egrcp.com / Admin@1234
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
