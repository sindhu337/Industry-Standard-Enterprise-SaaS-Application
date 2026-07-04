import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
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
  Alert,
  Divider,
  CircularProgress,
} from '@mui/material'
import {
  Visibility,
  VisibilityOff,
  LockOutlined,
  EmailOutlined,
  ShieldOutlined,
} from '@mui/icons-material'

import { loginUser, clearError } from '@/features/auth/authSlice'
import { ROUTES } from '@/constants/routes'
import { APP_CONFIG } from '@/constants/appConfig'

export default function LoginPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector((state) => state.auth)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(clearError())
    const result = await dispatch(loginUser({ email, password }))
    if (loginUser.fulfilled.match(result)) {
      navigate(ROUTES.DASHBOARD, { replace: true })
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
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
            backdropFilter: 'blur(10px)',
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

            {error && (
              <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }} onClose={() => dispatch(clearError())}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} noValidate>
              <TextField
                id="login-email"
                label="Email Address"
                type="email"
                fullWidth
                required
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                sx={{ mb: 2 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlined fontSize="small" color="action" />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                id="login-password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                sx={{ mb: 1 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined fontSize="small" color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        id="toggle-password-visibility"
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

              <Box sx={{ textAlign: 'right', mb: 3 }}>
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
                id="login-submit-btn"
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading || !email || !password}
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

            <Divider sx={{ my: 3 }}>
              <Typography variant="caption" color="text.secondary">
                OR
              </Typography>
            </Divider>

            <Box sx={{ textAlign: 'center' }}>
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
