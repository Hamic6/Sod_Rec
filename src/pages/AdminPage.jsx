import React from 'react';
import { Container, Typography, IconButton, Tooltip, Stack, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase'; // Adjust the import based on your project structure

const AdminPage = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate('/'); // Redirect to home or login page after sign out
    }).catch((error) => {
      // An error happened.
      console.error("Sign out error", error);
    });
  };

  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: { xs: 'center', md: 'space-between' },
          mt: 6,
          mb: 4,
          flexWrap: 'wrap'
        }}
      >
        <Typography
          variant="h3"
          fontWeight={700}
          align="center"
          gutterBottom
          sx={{
            letterSpacing: 1,
            color: '#ff9800',
            textShadow: '0 2px 8px rgba(0,0,0,0.08)',
            fontFamily: '"Poppins", "Montserrat", "Segoe UI", Arial, sans-serif',
            mb: { xs: 2, md: 0 }
          }}
        >
          Centre du Recrutement
        </Typography>
        <Stack direction="row" spacing={2}>
          <Tooltip title="Tableau de bord" arrow>
            <IconButton
              color="warning"
              size="large"
              onClick={() => navigate('/admin/dashboard')}
              sx={{
                bgcolor: '#fff3e0',
                border: '2px solid #ff9800',
                '&:hover': { bgcolor: '#ffe0b2' },
                mx: 1
              }}
            >
              <DashboardIcon sx={{ fontSize: 36, color: '#ff9800' }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Liste des candidats" arrow>
            <IconButton
              color="warning"
              size="large"
              onClick={() => navigate('/admin/candidates')}
              sx={{
                bgcolor: '#fff3e0',
                border: '2px solid #ff9800',
                '&:hover': { bgcolor: '#ffe0b2' },
                mx: 1
              }}
            >
              <GroupIcon sx={{ fontSize: 36, color: '#ff9800' }} />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>
      <Typography align="center" sx={{ mb: 4, fontSize: 18 }}>
        Bienvenue sur la page d’administration.<br />
        Choisissez une action ci-dessus pour gérer le recrutement.
      </Typography>
      <Box textAlign="center" mb={4}>
        <IconButton
          color="error"
          size="large"
          onClick={handleSignOut}
          sx={{
            bgcolor: '#ffebee',
            border: '2px solid #f44336',
            '&:hover': { bgcolor: '#ffcdd2' },
            mx: 1
          }}
        >
          <Typography variant="button" color="#f44336">
            Déconnexion
          </Typography>
        </IconButton>
      </Box>
    </Container>
  );
};

export default AdminPage;