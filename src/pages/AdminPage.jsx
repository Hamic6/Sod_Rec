import React, { useState, useEffect } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Card,
  CardContent,
  Grid,
  Button,
  CssBaseline,
  useMediaQuery,
  Tooltip,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  BottomNavigation,
  BottomNavigationAction,
  Fab,
  Zoom,
  useScrollTrigger
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  BarChart as BarChartIcon,
  Assignment as AssignmentIcon,
  Menu as MenuIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon
} from '@mui/icons-material';
import { useTheme, styled, alpha } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';

// Images locales
import logo from '../Assets/SODEICO1.png';
import admin1 from '../Assets/admin1.jpg';
import admin2 from '../Assets/admin2.jpg';
import admin3 from '../Assets/admin3.jpg';

const drawerWidth = 240;

const menuItems = [
  { label: 'Tableau de bord', icon: <DashboardIcon />, path: '/admin/dashboard' },
  { label: 'Candidats', icon: <GroupIcon />, path: '/admin/candidates' },
  { label: 'Statistiques', icon: <BarChartIcon />, path: '/admin/stats' },
  { label: 'Rapports', icon: <AssignmentIcon />, path: '/admin/reports' },
];

const carouselImages = [admin1, admin2, admin3];

// Remplace le LogoutButton par un bouton arrondi, ombré, avec effet hover plus doux
const LogoutButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: '#fff',
  border: `2px solid #ff9800`,
  borderRadius: 12,
  padding: theme.spacing(1.2),
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  transition: 'all 0.2s',
  '&:hover': {
    backgroundColor: '#ff9800',
    borderColor: '#ff9800',
    boxShadow: '0 4px 16px rgba(255,152,0,0.15)',
    transform: 'scale(1.08)',
    '& .MuiSvgIcon-root': {
      color: '#fff',
    }
  },
  '& .MuiSvgIcon-root': {
    color: '#ff9800',
    transition: 'color 0.2s',
  }
}));

// Pour le bouton menu mobile, même style arrondi et ombré
const MenuButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: '#fff',
  border: `2px solid #222`,
  borderRadius: 12,
  padding: theme.spacing(1.2),
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  transition: 'all 0.2s',
  '&:hover': {
    backgroundColor: '#222',
    borderColor: '#222',
    boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
    transform: 'scale(1.08)',
    '& .MuiSvgIcon-root': {
      color: '#fff',
    }
  },
  '& .MuiSvgIcon-root': {
    color: '#222',
    transition: 'color 0.2s',
  }
}));

function ScrollTop(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor',
    );
    if (anchor) {
      anchor.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 90, right: 24, zIndex: 1000 }}
      >
        {children}
      </Box>
    </Zoom>
  );
}

// Déclare cardsData AVANT le composant
const cardsData = [
  { 
    title: "Tableau de bord", 
    icon: <DashboardIcon sx={{ fontSize: 32, color: '#ff9800' }} />,
    description: "Vue d'ensemble de l'activité du recrutement, indicateurs clés et alertes importantes.",
    action: "Voir le tableau de bord",
    onClick: null
  },
  { 
    title: "Statistiques", 
    icon: <BarChartIcon sx={{ fontSize: 32, color: '#222' }} />,
    description: "Aperçu des candidatures reçues ce mois. Visualisez les tendances et performances de vos campagnes.",
    action: "Voir les stats",
    onClick: null
  },
  { 
    title: "Candidats", 
    icon: <GroupIcon sx={{ fontSize: 32, color: '#222' }} />,
    description: "Liste complète des candidats et gestion des statuts. Ajoutez des notes et commentaires pour chaque profil.",
    action: "Voir les candidats",
    onClick: null
  },
  { 
    title: "Rapports", 
    icon: <AssignmentIcon sx={{ fontSize: 32, color: '#222' }} />,
    description: "Exportez vos rapports de recrutement aux formats PDF, Excel ou CSV. Personnalisez les données incluses.",
    action: "Exporter",
    onClick: null
  }
];

const AdminPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [bottomNavValue, setBottomNavValue] = useState(0);

  // Ajoute les onClick dynamiquement ici
  const cards = cardsData.map((card, idx) => ({
    ...card,
    onClick:
      card.title === "Tableau de bord"
        ? () => navigate('/admin/dashboard')
        : card.title === "Candidats"
        ? () => navigate('/admin/candidates')
        : undefined
  }));

  // Déclare cardsCount juste après cards
  const cardsCount = cards.length;

  const [scrollIndex, setScrollIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % carouselImages.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Auto-play pour le scroll horizontal sur PC
  useEffect(() => {
    if (!isMobile) {
      const interval = setInterval(() => {
        setScrollIndex((prev) => (prev + 1) % cardsCount);
      }, 3500);
      return () => clearInterval(interval);
    }
  }, [isMobile, cardsCount]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error('Sign out error', error);
      });
    setLogoutDialogOpen(false);
  };

  const handleBottomNavChange = (event, newValue) => {
    setBottomNavValue(newValue);
    navigate(menuItems[newValue].path);
    if (isMobile) setMobileSidebarOpen(false);
  };

  return (
    <>
      <CssBaseline />
      {/* Confirmation de déconnexion */}
      <Dialog
        open={logoutDialogOpen}
        onClose={() => setLogoutDialogOpen(false)}
        aria-labelledby="logout-dialog-title"
      >
        <DialogTitle id="logout-dialog-title">
          Confirmation de déconnexion
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Êtes-vous sûr de vouloir vous déconnecter ?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLogoutDialogOpen(false)} color="primary">
            Annuler
          </Button>
          <Button onClick={handleSignOut} color="error" variant="contained">
            Se déconnecter
          </Button>
        </DialogActions>
      </Dialog>

      {/* Header */}
      <AppBar
        position="fixed"
        elevation={2}
        sx={{
          bgcolor: '#fff',
          color: '#222',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <Toolbar sx={{ minHeight: 72, px: { xs: 2, sm: 3 } }}>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              src={logo}
              alt="SODEICO"
              style={{
                height: 72,
                objectFit: 'contain',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
              }}
            />
          </Box>
          {isMobile && (
            <Tooltip title="Menu" arrow>
              <MenuButton
                onClick={() => setMobileSidebarOpen(true)}
                size="large"
                sx={{ ml: 1, mr: 1 }}
              >
                <MenuIcon fontSize="large" />
              </MenuButton>
            </Tooltip>
          )}
          <Tooltip title="Déconnexion" arrow placement="bottom">
            <LogoutButton
              onClick={() => setLogoutDialogOpen(true)}
              size="large"
            >
              <LogoutIcon />
            </LogoutButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? mobileSidebarOpen : true}
        onClose={() => setMobileSidebarOpen(false)}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: '#fff',
            borderRight: '1px solid',
            borderColor: 'divider',
            pt: 8, // espace pour voir le premier item
            backgroundImage: 'linear-gradient(to bottom, #ffffff, #fafafa)',
          },
        }}
      >
        <List sx={{ px: 1 }}>
          {menuItems.map((item, index) => (
            <ListItem
              button
              key={item.label}
              onClick={() => {
                navigate(item.path);
                if (isMobile) setMobileSidebarOpen(false);
              }}
              sx={{
                borderRadius: 2,
                mx: 1,
                mb: 1,
                transition: 'all 0.2s',
                '&:hover': { 
                  bgcolor: alpha(theme.palette.primary.main, 0.08),
                  transform: 'translateX(4px)'
                },
              }}
            >
              <ListItemIcon sx={{ color: '#222' }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: 500,
                  fontFamily: '"Poppins", "Montserrat", "Segoe UI", Arial, sans-serif',
                  color: '#222'
                }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: '#f7f7fa',
          minHeight: '100vh',
          pl: { xs: 0, md: `${drawerWidth}px` },
          pt: { xs: 10, md: 12 },
          position: 'relative',
          transition: 'padding 0.3s ease',
          pb: { xs: 10, sm: 4 }
        }}
        id="back-to-top-anchor"
      >
        {/* Carousel */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: { xs: 220, md: 340 },
            zIndex: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            background: `linear-gradient(90deg, #fff 0%, #f7f7fa 100%)`,
            overflow: 'hidden'
          }}
        >
          <Box
            sx={{
              width: { xs: '90%', sm: 600, md: 800 },
              height: { xs: 300, sm: 360, md: 440 },
              borderRadius: 4,
              boxShadow: 4,
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#fff',
            }}
          >
            <img
              src={carouselImages[carouselIndex]}
              alt="carousel"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'opacity 0.7s ease',
                opacity: 1,
                borderRadius: '16px',
              }}
            />
          </Box>
        </Box>

        <Container maxWidth="lg" sx={{ py: 4, position: 'relative', zIndex: 1 }}>
          {/* Panel de bienvenue - taille améliorée et responsive */}
          <Box sx={{
            bgcolor: 'rgba(255,255,255,0.97)',
            borderRadius: 4,
            boxShadow: 3,
            px: { xs: 2, sm: 5, md: 8 },
            py: { xs: 3, sm: 5, md: 7 },
            mb: 6,
            mt: { xs: 2, md: 8 },
            maxWidth: { xs: '100%', sm: 500, md: 700 },
            mx: 'auto',
            textAlign: 'center',
            backdropFilter: 'blur(8px)',
            border: '1px solid',
            borderColor: 'divider',
            backgroundImage: 'linear-gradient(to bottom, #ffffff, #f8f9fa)'
          }}>
            <Typography
              variant="h4"
              fontWeight={700}
              sx={{
                mb: 2,
                color: '#222',
                fontFamily: '"Poppins", "Montserrat", "Segoe UI", Arial, sans-serif',
                letterSpacing: 0.5,
                fontSize: { xs: 24, sm: 32, md: 36 }
              }}
            >
              Centre du Recrutement
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: '#444',
                lineHeight: 1.6,
                fontSize: { xs: 16, sm: 18, md: 20 }
              }}
            >
              Bienvenue sur la page d'administration.<br />
              Gérez vos recrutements, consultez les statistiques et exportez vos rapports.
            </Typography>
          </Box>

          {/* Cartes améliorées et responsive */}
          {isMobile ? (
            <Grid
              container
              spacing={3}
              justifyContent="center"
              alignItems="stretch"
              sx={{ mt: 2 }}
            >
              {cards.map((card, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  key={index}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <Card
                    elevation={4}
                    sx={{
                      borderRadius: 4,
                      bgcolor: '#fff',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                      height: '100%',
                      width: '100%',
                      maxWidth: 400,
                      minWidth: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'all 0.3s ease',
                      border: '1px solid',
                      borderColor: 'divider',
                      minHeight: { xs: 220, sm: 240 },
                      '&:hover': {
                        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                        transform: 'translateY(-8px)',
                      },
                    }}
                  >
                    <CardContent sx={{ p: { xs: 2, sm: 3 }, flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        {card.icon}
                        <Typography
                          variant="h6"
                          fontWeight={600}
                          sx={{
                            ml: 1,
                            color: '#222',
                            fontSize: { xs: 18, sm: 20 }
                          }}
                        >
                          {card.title}
                        </Typography>
                      </Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mb: 2,
                          fontSize: { xs: 14, sm: 15 }
                        }}
                      >
                        {card.description}
                      </Typography>
                    </CardContent>
                    <Box sx={{ px: { xs: 2, sm: 3 }, pb: { xs: 2, sm: 3 } }}>
                      <Button 
                        variant="contained" 
                        color={index === 0 ? "warning" : "inherit"}
                        fullWidth
                        onClick={card.onClick}
                        sx={{ 
                          fontWeight: 600, 
                          borderRadius: 2,
                          py: 1,
                          bgcolor: index === 0 ? '#ff9800' : '#222',
                          color: '#fff',
                          fontSize: { xs: 14, sm: 15 },
                          boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.12)}`,
                          '&:hover': {
                            boxShadow: `0 6px 16px ${alpha(theme.palette.primary.main, 0.18)}`,
                            bgcolor: index === 0 ? '#fb8c00' : '#111',
                          }
                        }}
                      >
                        {card.action}
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box sx={{ mt: 2 }}>
              <ScrollMenu
                scrollToItem={scrollIndex}
                transitionBehavior="smooth"
              >
                {cards.map((card, index) => (
                  <Box key={index} itemId={index} sx={{ mx: 2, display: 'flex', justifyContent: 'center' }}>
                    <Card
                      elevation={4}
                      sx={{
                        minWidth: 340,
                        maxWidth: 360,
                        borderRadius: 4,
                        bgcolor: '#fff',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        transition: 'all 0.3s ease',
                        border: '1px solid',
                        borderColor: 'divider',
                        minHeight: 260,
                        '&:hover': {
                          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                          transform: 'translateY(-8px)',
                        },
                      }}
                    >
                      <CardContent sx={{ p: 3, flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          {card.icon}
                          <Typography
                            variant="h6"
                            fontWeight={600}
                            sx={{
                              ml: 1,
                              color: '#222',
                              fontSize: 20
                            }}
                          >
                            {card.title}
                          </Typography>
                        </Box>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            mb: 2,
                            fontSize: 15
                          }}
                        >
                          {card.description}
                        </Typography>
                      </CardContent>
                      <Box sx={{ px: 3, pb: 3 }}>
                        <Button 
                          variant="contained" 
                          color={index === 0 ? "warning" : "inherit"}
                          fullWidth
                          onClick={card.onClick}
                          sx={{ 
                            fontWeight: 600, 
                            borderRadius: 2,
                            py: 1,
                            bgcolor: index === 0 ? '#ff9800' : '#222',
                            color: '#fff',
                            fontSize: 15,
                            boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.12)}`,
                            '&:hover': {
                              boxShadow: `0 6px 16px ${alpha(theme.palette.primary.main, 0.18)}`,
                              bgcolor: index === 0 ? '#fb8c00' : '#111',
                            }
                          }}
                        >
                          {card.action}
                        </Button>
                      </Box>
                    </Card>
                  </Box>
                ))}
              </ScrollMenu>
            </Box>
          )}

        </Container>

        {/* Navigation mobile */}
        {isMobile && (
          <BottomNavigation
            value={bottomNavValue}
            onChange={handleBottomNavChange}
            showLabels
            sx={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 1100,
              bgcolor: '#fff',
              borderTop: '1px solid',
              borderColor: 'divider',
              boxShadow: '0 -2px 12px rgba(0,0,0,0.06)',
              height: 70,
              '& .MuiBottomNavigationAction-root': {
                minWidth: 'auto',
                px: 1,
                color: '#222',
                '&.Mui-selected': {
                  color: '#ff9800',
                }
              }
            }}
          >
            {menuItems.map((item, index) => (
              <BottomNavigationAction 
                key={item.label} 
                label={item.label} 
                icon={item.icon} 
                sx={{
                  '& .MuiBottomNavigationAction-label': {
                    fontSize: '0.7rem',
                    mt: 0.5
                  }
                }}
              />
            ))}
          </BottomNavigation>
        )}

        {/* Bouton scroll-to-top */}
        <ScrollTop>
          <Fab color="warning" size="medium" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </Box>
    </>
  );
};

export default AdminPage;