import { useEffect } from 'react'
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
  CircularProgress,
} from '@mui/material'
import {
  EmailOutlined,
  ShieldOutlined,
  ArrowBack,
} from '@mui/icons-material'

import { forgotPassword, clearError, clearSuccess } from '@/features/auth/authSlice'
import { showSnackbar } from '@/app/store/slices/uiSlice'
import { ROUTES } from '@/constants/routes'
import { APP_CONFIG } from '@/constants/appConfig'
import { forgotPasswordSchema } from '@/validations/auth.validation'

export default function ForgotPasswordPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, successMessage } = useSelector((state) => state.auth)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  useEffect(() => {
    dispatch(clearError())
    dispatch(clearSuccess())
  }, [dispatch])

  const onSubmit = async (data) => {
    dispatch(clearError())
    dispatch(clearSuccess())
    const result = await dispatch(forgotPassword({ email: data.email }))
    if (forgotPassword.fulfilled.match(result)) {
      dispatch(showSnackbar({ message: result.payload.message || 'Password reset email sent!', severity: 'success' }))
      // Redirect to Reset Password with dynamic email state
      setTimeout(() => {
        navigate(ROUTES.RESET_PASSWORD, { state: { email: data.email } })
      }, 1500)
    } else {
      dispatch(showSnackbar({ message: result.payload || 'Failed to process request.', severity: 'error' }))
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

        <Card sx={{ borderRadius: 3, boxShadow: '0 24px 64px rgba(0,0,0,0.25)', border: 'none' }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h6" fontWeight={700} color="text.primary" gutterBottom>
              Forgot Password?
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Enter your email and we will send you a mock link to reset your password.
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
                sx={{ mb: 3 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlined fontSize="small" color="action" />
                    </InputAdornment>
                  ),
                }}
              />

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
                  mb: 2,
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Send Reset Link'}
              </Button>
            </Box>

            <Box sx={{ textAlign: 'center', mt: 1 }}>
              <Link
                component={RouterLink}
                to={ROUTES.LOGIN}
                color="text.secondary"
                variant="body2"
                sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, fontWeight: 600, underline: 'hover' }}
              >
                <ArrowBack fontSize="inherit" /> Back to Sign In
              </Link>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}
