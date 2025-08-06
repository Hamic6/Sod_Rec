import React from 'react';
import { Container, Typography, Grid } from '@mui/material';
import CandidateList from '../components/CandidateList';
import Dashboard from '../components/Dashboard';

const AdminPage = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Tableau de bord Administrateur
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Dashboard />
        </Grid>
        <Grid item xs={12} md={4}>
          <CandidateList />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminPage;