import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  Paper,
  Grid,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Ajout des imports pour react-slick
import Slider from "react-slick";
import img1 from '../Assets/img1.jpeg';
import img2 from '../Assets/img2.jpeg';
import img3 from '../Assets/img3.jpeg';
import SodeicoLogo from '../Assets/SODEICO.png'; // Ajoute cet import en haut

// N'oublie pas d'importer les styles slick dans App.js ou ici :
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(8), // Augmente le padding
  borderRadius: theme.shape.borderRadius * 2.5,
  background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[100]} 100%)`,
  boxShadow: theme.shadows[12], // Ombre plus prononcée
  position: 'relative',
  overflow: 'hidden',
  maxWidth: 600, // Largeur légèrement augmentée (450 -> 600)
  margin: '0 auto',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 10,
    background: theme.palette.warning.main
  }
}));

const AnimatedButton = styled(Button)(({ theme }) => ({
  transition: 'all 0.3s ease',
  fontWeight: 600,
  letterSpacing: '0.5px',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[4]
  }
}));

const images = [img1, img2, img3];

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Paramètres du carousel
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: !isMobile,
    autoplay: true,
    autoplaySpeed: 3500,
    adaptiveHeight: true
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '80vh',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        px: { xs: 0, sm: 2 },
      }}
    >
      {/* Carousel d'images */}
      <Box sx={{ width: '100%', maxWidth: 600, mb: 6, px: { xs: 0, sm: 0 } }}>
        <Slider {...sliderSettings}>
          {images.map((src, idx) => (
            <Box
              key={idx}
              sx={{
                width: '100%',
                height: isMobile ? 220 : 400,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                borderRadius: 4,
                boxShadow: 3,
                background: 'transparent'
              }}
            >
              <img
                src={src}
                alt={`carousel-img-${idx + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  margin: '0 auto'
                }}
              />
            </Box>
          ))}
        </Slider>
      </Box>

      {/* Background logos */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        <img
          src={SodeicoLogo}
          alt=""
          style={{
            position: 'absolute',
            top: '-7%',
            left: '-10%',
            width: 340,
            opacity: 0.6,
            filter: 'grayscale(1)',
            userSelect: 'none',
            transform: 'rotate(-15deg)',
          }}
        />
        <img
          src={SodeicoLogo}
          alt=""
          style={{
            position: 'absolute',
            bottom: '-5%',
            right: '-12%',
            width: 300,
            opacity: 0.55,
            filter: 'grayscale(1)',
            userSelect: 'none',
            transform: 'rotate(12deg)',
          }}
        />
        <img
          src={SodeicoLogo}
          alt=""
          style={{
            position: 'absolute',
            top: '30%',
            right: '8%',
            width: 160,
            opacity: 0.45,
            filter: 'grayscale(1)',
            userSelect: 'none',
            transform: 'rotate(-8deg)',
          }}
        />
        <img
          src={SodeicoLogo}
          alt=""
          style={{
            position: 'absolute',
            bottom: '12%',
            left: '10%',
            width: 110,
            opacity: 0.38,
            filter: 'grayscale(1)',
            userSelect: 'none',
            transform: 'rotate(18deg)',
          }}
        />
      </Box>

      <StyledPaper>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography
              variant={isMobile ? 'h6' : 'h4'}
              gutterBottom
              align="center"
              sx={{
                fontWeight: 700,
                color: theme.palette.text.primary,
                mb: 1.5,
                fontSize: isMobile ? '1rem' : '1.5rem'
              }}
            >
              Bienvenue sur la plateforme de Recrutement
            </Typography>
            <Typography
              variant="subtitle2"
              align="center"
              sx={{
                mb: 2.5,
                color: theme.palette.text.secondary,
                fontSize: isMobile ? '0.5rem' : '0.75rem'
              }}
            >
              Découvrez des opportunités passionnantes et simplifiez votre processus de recrutement
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: isMobile ? 'column' : 'row',
                gap: 1
              }}
            >
              <AnimatedButton
                variant="contained"
                color="warning"
                component={Link}
                to="/candidate"
                size="medium"
                sx={{
                  py: 0.75,
                  px: 2,
                  borderRadius: 2,
                  minWidth: isMobile ? '100%' : 100
                }}
              >
                Espace Candidat
              </AnimatedButton>
              <AnimatedButton
                variant="outlined"
                color="warning"
                component={Link}
                to="/admin"
                size="medium"
                sx={{
                  py: 0.75,
                  px: 2,
                  borderRadius: 2,
                  borderWidth: 2,
                  '&:hover': {
                    borderWidth: 2
                  },
                  minWidth: isMobile ? '100%' : 100
                }}
              >
                Espace Admin
              </AnimatedButton>
            </Box>
          </Grid>

          {!isMobile && (
            <Grid item xs={12}>
              <Box sx={{
                mt: 2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 1
              }}>
                {[1, 2, 3].map((item) => (
                  <Box key={item} sx={{
                    width: 4,
                    height: 4,
                    borderRadius: '50%',
                    bgcolor: theme.palette.grey[400],
                    opacity: 0.6
                  }} />
                ))}
              </Box>
            </Grid>
          )}
        </Grid>
      </StyledPaper>

      {/* Footer toujours affiché, mobile et desktop */}
      <Box
        component="footer"
        sx={{
          mt: 6,
          py: 3,
          width: '100%',
          background: 'linear-gradient(90deg, #fff 60%, #ff9800 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          boxShadow: '0 -2px 16px rgba(251,140,0,0.08)',
          flexDirection: 'column',
          gap: 1.5,
        }}
      >
        <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
          <a href="https://www.linkedin.com/company/sodeico" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg width="28" height="28" fill="#181818" style={{ background: '#fff', borderRadius: '50%', padding: 4, boxShadow: '0 2px 8px #ff980033' }} viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm15.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"/></svg>
          </a>
          <a href="https://www.facebook.com/sodeico" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <svg width="28" height="28" fill="#181818" style={{ background: '#fff', borderRadius: '50%', padding: 4, boxShadow: '0 2px 8px #ff980033' }} viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.733 0-1.325.592-1.325 1.326v21.348c0 .733.592 1.326 1.325 1.326h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.312h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.326v-21.349c0-.733-.593-1.325-1.326-1.325z"/></svg>
          </a>
          <a href="https://twitter.com/sodeico" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <svg width="28" height="28" fill="#181818" style={{ background: '#fff', borderRadius: '50%', padding: 4, boxShadow: '0 2px 8px #ff980033' }} viewBox="0 0 24 24"><path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195a4.92 4.92 0 0 0-8.384 4.482c-4.086-.205-7.713-2.164-10.141-5.144a4.822 4.822 0 0 0-.664 2.475c0 1.708.87 3.216 2.188 4.099a4.904 4.904 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417a9.867 9.867 0 0 1-6.102 2.104c-.396 0-.787-.023-1.175-.069a13.945 13.945 0 0 0 7.548 2.212c9.057 0 14.009-7.513 14.009-14.009 0-.213-.005-.425-.014-.636a10.012 10.012 0 0 0 2.457-2.548z"/></svg>
          </a>
        </Box>
        <Typography
          variant="body2"
          sx={{
            color: '#181818',
            fontWeight: 600,
            letterSpacing: 0.5,
            textAlign: 'center',
            mx: 1,
            fontSize: { xs: '0.85rem', md: '1rem' },
          }}
        >
          © {new Date().getFullYear()} <span style={{ color: '#ff9800', fontWeight: 700 }}>Sodeico</span> — Tous droits réservés.
        </Typography>
      </Box>
    </Container>
  );
};

export default HomePage;