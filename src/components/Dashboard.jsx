import React from 'react';
import { Paper, Typography, Stack } from '@mui/material';

const Dashboard = () => (
  <Paper sx={{ p: 4, maxWidth: 600, mx: 'auto', mt: 4 }}>
    <Typography variant="h5" fontWeight={700}>Tableau de bord Administrateur</Typography>
    <Stack direction="row" spacing={4} sx={{ mt: 3 }}>
      <Paper sx={{ p: 2, flex: 1, textAlign: 'center' }}>
        <Typography variant="h6">Candidats</Typography>
        <Typography variant="h4" color="warning.main">12</Typography>
      </Paper>
      <Paper sx={{ p: 2, flex: 1, textAlign: 'center' }}>
        <Typography variant="h6">Validés</Typography>
        <Typography variant="h4" color="success.main">5</Typography>
      </Paper>
      <Paper sx={{ p: 2, flex: 1, textAlign: 'center' }}>
        <Typography variant="h6">Rejetés</Typography>
        <Typography variant="h4" color="error.main">2</Typography>
      </Paper>
    </Stack>
  </Paper>
);

export default Dashboard;