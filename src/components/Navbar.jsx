import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import logo from '../Assets/SODEICO.png';

const navLinks = [
  { label: 'Accueil', to: '/' },
  { label: 'Candidats', to: '/candidate' },
  { label: 'Admin', to: '/admin' },
];

function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

  return (
    <AppBar
      position="static"
      elevation={2}
      sx={{
        background: {
          xs: 'rgba(255,255,255,0.95)', // mobile : fond blanc
          md: 'linear-gradient(90deg, #000000ff 0%, #fff 90%, rgba(255,255,255,0.95) 100%)' // desktop : dégradé orange à gauche
        },
        color: "#222",
        boxShadow: 3,
        backdropFilter: 'blur(6px)',
      }}
    >
      <Toolbar>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mr: 2,
            ml: { xs: 0, sm: 1 },
          }}
        >
          <Box
            sx={{
              display: 'inline-block',
              borderRadius: 2,
              background: 'rgba(34,34,34,0.10)',
              p: 0.5,
            }}
          >
            <img
              src={logo}
              alt="SODEICO Logo"
              style={{
                height: 40,
                verticalAlign: 'middle',
                filter: 'drop-shadow(0 1px 6px rgba(0,0,0,0.18))'
              }}
            />
          </Box>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        {isMobile ? (
          <>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
              sx={{ ml: 1 }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={handleDrawerToggle}
              PaperProps={{
                sx: { width: 220 }
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  p: 2,
                  background: 'rgba(34,34,34,0.10)',
                }}
              >
                <img
                  src={logo}
                  alt="SODEICO Logo"
                  style={{
                    height: 32,
                    verticalAlign: 'middle',
                    filter: 'drop-shadow(0 1px 6px rgba(0,0,0,0.18))'
                  }}
                />
              </Box>
              <List>
                {navLinks.map((item) => (
                  <ListItem key={item.to} disablePadding>
                    <ListItemButton
                      component={Link}
                      to={item.to}
                      onClick={handleDrawerToggle}
                    >
                      <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{
                          fontWeight: 600,
                          color: "#222",
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Drawer>
          </>
        ) : (
          <Box>
            {navLinks.map((item) => (
              <Button
                key={item.to}
                color="inherit"
                variant="text"
                component={Link}
                to={item.to}
                sx={{
                  mx: 1,
                  fontWeight: 500,
                  color: "#222",
                  '&:hover': { color: '#ff9800', background: 'rgba(255,152,0,0.08)' }
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;