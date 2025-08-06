import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import logo from '../Assets/SODEICO.png';

const vibration = {
  animation: 'vibrate 0.5s infinite linear',
  '@keyframes vibrate': {
    '0%': { transform: 'translate(0)' },
    '20%': { transform: 'translate(-2px, 2px)' },
    '40%': { transform: 'translate(-2px, -2px)' },
    '60%': { transform: 'translate(2px, 2px)' },
    '80%': { transform: 'translate(2px, -2px)' },
    '100%': { transform: 'translate(0)' },
  }
};

const SplashScreen = () => (
  <Box
    sx={{
      minHeight: '100vh',
      width: '100vw',
      bgcolor: 'background.default',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 2000,
      // Ajoute les keyframes globalement
      '@global': {
        '@keyframes vibrate': vibration['@keyframes vibrate'],
      }
    }}
  >
    <img
      src={logo}
      alt="SODEICO"
      style={{
        height: 80,
        marginBottom: 24,
        filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.25))',
        animation: 'vibrate 0.5s infinite linear'
      }}
    />
    <CircularProgress color="warning" />
    <Typography sx={{ mt: 2, fontWeight: 600, color: 'text.secondary' }}>
      Chargement...
    </Typography>
  </Box>
);

export default SplashScreen;