import { Box } from '@mui/material'

export default function AppLogo({ width = 140, height = 'auto', sx = {}, alt = 'e-GRCP logo' }) {
  return (
    <Box
      component="img"
      src="/logo.png"
      alt={alt}
      sx={{
        width,
        height,
        display: 'block',
        objectFit: 'contain',
        ...sx,
      }}
    />
  )
}
