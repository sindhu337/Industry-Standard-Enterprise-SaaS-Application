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
  Grid,
  Stack,
  useTheme,
  alpha,
} from '@mui/material'
import {
  Visibility,
  VisibilityOff,
  LockOutlined,
  EmailOutlined,
  PersonOutlined,
  ShieldOutlined,
} from '@mui/icons-material'
import { motion } from 'framer-motion'
import AppLogo from '@/components/common/AppLogo'

import { registerUser, clearError } from '@/features/auth/authSlice'
import { showSnackbar } from '@/app/store/slices/uiSlice'
import { ROUTES } from '@/constants/routes'
import { APP_CONFIG } from '@/constants/appConfig'
import { signupSchema } from '@/validations/auth.validation'

export default function SignupPage() {
  const theme = useTheme()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading } = useSelector((state) => state.auth)

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  useEffect(() => {
    dispatch(clearError())
  }, [dispatch])

  const onSubmit = async (data) => {
    dispatch(clearError())
    const result = await dispatch(registerUser({ name: data.name, email: data.email, password: data.password }))
    if (registerUser.fulfilled.match(result)) {
      dispatch(showSnackbar({ message: 'Account successfully created! Please sign in.', severity: 'success' }))
      navigate(ROUTES.LOGIN, { replace: true })
    } else {
      dispatch(showSnackbar({ message: result.payload || 'Signup failed.', severity: 'error' }))
    }
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

        <Stack spacing={2} direction="row" alignItems="center" sx={{ zIndex: 1 }}>
          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: 2,
              bgcolor: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(12px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(255,255,255,0.3)',
            }}
          >
            <ShieldOutlined sx={{ fontSize: 24, color: '#fff' }} />
          </Box>
          <Typography variant="h5" fontWeight={800} letterSpacing="-0.5px">
            {APP_CONFIG.APP_NAME}
          </Typography>
        </Stack>

        <Box sx={{ zIndex: 1, my: 'auto', maxWidth: 480 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography variant="h2" fontWeight={800} gutterBottom sx={{ fontSize: { md: '2.5rem', lg: '3.5rem' }, lineHeight: 1.1 }}>
              Start Collaborating Securely.
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.85)', mb: 4, lineHeight: 1.7, fontSize: '1.1rem' }}>
              Create an account as an employee to begin drafting procurement requests, linking compliance guidelines, and contributing to audits.
            </Typography>
          </motion.div>
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
                Create Account
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                Join as an employee and start managing governance.
              </Typography>

              <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                <TextField
                  {...register('name')}
                  label="Full Name"
                  type="text"
                  fullWidth
                  required
                  error={Boolean(errors.name)}
                  helperText={errors.name?.message}
                  disabled={loading}
                  sx={{ mb: 2.5 }}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonOutlined fontSize="small" color="action" />
                        </InputAdornment>
                      ),
                    },
                  }}
                />

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
                  sx={{ mb: 2.5 }}
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

                <TextField
                  {...register('confirmPassword')}
                  label="Confirm Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  fullWidth
                  required
                  error={Boolean(errors.confirmPassword)}
                  helperText={errors.confirmPassword?.message}
                  disabled={loading}
                  sx={{ mb: 4 }}
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
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            edge="end"
                            size="small"
                          >
                            {showConfirmPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />

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
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Create Account'}
                </Button>
              </Box>

              <Box sx={{ textAlign: 'center', mt: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  Already have an account?{' '}
                  <Link
                    component={RouterLink}
                    to={ROUTES.LOGIN}
                    color="primary"
                    fontWeight={700}
                    underline="none"
                  >
                    Sign In
                  </Link>
                </Typography>
              </Box>
            </CardContent>
          </Card>

        </Box>
      </Box>

    </Box>
  )
}
