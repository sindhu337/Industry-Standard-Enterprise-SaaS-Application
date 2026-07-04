import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom'
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
} from '@mui/material'
import {
  LockOutlined,
  Visibility,
  VisibilityOff,
  ShieldOutlined,
  ArrowBack,
} from '@mui/icons-material'

import { resetPassword, clearError, clearSuccess } from '@/features/auth/authSlice'
import { showSnackbar } from '@/app/store/slices/uiSlice'
import { ROUTES } from '@/constants/routes'
import { APP_CONFIG } from '@/constants/appConfig'
import { resetPasswordSchema } from '@/validations/auth.validation'

export default function ResetPasswordPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { loading } = useSelector((state) => state.auth)

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const userEmail = location.state?.email || ''

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  useEffect(() => {
    dispatch(clearError())
    dispatch(clearSuccess())
  }, [dispatch])

  const onSubmit = async (data) => {
    dispatch(clearError())
    dispatch(clearSuccess())
    const result = await dispatch(resetPassword({ password: data.password }))
    if (resetPassword.fulfilled.match(result)) {
      dispatch(showSnackbar({ message: result.payload.message || 'Password reset successful!', severity: 'success' }))
      setTimeout(() => {
        navigate(ROUTES.LOGIN, { replace: true })
      }, 1500)
    } else {
      dispatch(showSnackbar({ message: result.payload || 'Failed to reset password.', severity: 'error' }))
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
              Reset Password
            </Typography>
            {userEmail && (
              <Typography variant="body2" color="primary" fontWeight={600} sx={{ mb: 2 }}>
                Resetting password for: {userEmail}
              </Typography>
            )}
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Enter your new credentials below to update your password.
            </Typography>

            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
              <TextField
                {...register('password')}
                label="New Password"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                required
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
                disabled={loading}
                sx={{ mb: 2.5 }}
                InputProps={{
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
                }}
              />

              <TextField
                {...register('confirmPassword')}
                label="Confirm New Password"
                type={showConfirmPassword ? 'text' : 'password'}
                fullWidth
                required
                error={Boolean(errors.confirmPassword)}
                helperText={errors.confirmPassword?.message}
                disabled={loading}
                sx={{ mb: 3 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined fontSize="small" color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                        size="small"
                        aria-label="toggle confirm password visibility"
                      >
                        {showConfirmPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                      </IconButton>
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
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Reset Password'}
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
