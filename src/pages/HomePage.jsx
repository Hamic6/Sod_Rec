import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  Stack, 
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
    <Container maxWidth="lg" sx={{ // Passe à lg pour plus de largeur
      mt: 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '80vh',
      justifyContent: 'center'
    }}>
      {/* Carousel d'images */}
      <Box sx={{ width: '100%', maxWidth: 400, mb: 6 }}>
        <Slider {...sliderSettings}>
          {images.map((src, idx) => (
            <Box
              key={idx}
              sx={{
                width: '100%',
                height: isMobile ? 180 : 300,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                borderRadius: 4,
                boxShadow: 3,
                background: 'transparent' // <-- fond transparent
              }}
            >
              <img
                src={src}
                alt={`carousel-img-${idx + 1}`}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                  display: 'block',
                  margin: '0 auto'
                }}
              />
            </Box>
          ))}
        </Slider>
      </Box>

      <StyledPaper>
        <Grid container spacing={3}> {/* Espacement réduit */}
          <Grid item xs={12}>
            <Typography 
              variant={isMobile ? 'h6' : 'h4'} // Taille réduite
              gutterBottom 
              align="center"
              sx={{
                fontWeight: 700,
                color: theme.palette.text.primary,
                mb: 1.5,
                fontSize: isMobile ? '1rem' : '1.5rem' // Taille réduite
              }}
            >
              Bienvenue sur l'Application de Recrutement
            </Typography>
            <Typography 
              variant="subtitle2" // Plus petit
              align="center" 
              sx={{ 
                mb: 2.5,
                color: theme.palette.text.secondary,
                fontSize: isMobile ? '0.5rem' : '0.75rem' // Taille réduite
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
                gap: 1 // Réduit l'espacement entre les boutons
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
                  minWidth: isMobile ? '100%' : 100 // Largeur réduite
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
                  minWidth: isMobile ? '100%' : 100 // Largeur réduite
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
      
      {!isMobile && (
        <Box sx={{ 
          mt: 4,
          textAlign: 'center',
          color: theme.palette.text.secondary
        }}>
          <Typography variant="caption">
            © Copyright {new Date().getFullYear()} Sodeico All Rights Reserved.
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default HomePage;