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
  useMediaQuery,
  AppBar,
  Toolbar,
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SodeicoLogo from '../Assets/SODEICO.png';
import img1 from '../Assets/img1.jpeg';
import img2 from '../Assets/img3.jpg';
import img3 from '../Assets/img3.jpeg';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import BarChartIcon from '@mui/icons-material/BarChart';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(8),
  borderRadius: theme.shape.borderRadius * 2.5,
  background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[100]} 100%)`,
  boxShadow: theme.shadows[12],
  position: 'relative',
  overflow: 'hidden',
  maxWidth: 600,
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

  // Paramètres du carousel pour le header
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3500,
    adaptiveHeight: false,
    fade: true
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fafbfc', display: 'flex', flexDirection: 'column' }}>
      {/* Header avec carousel d'images en fond */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: 'transparent',
          color: '#181818',
          borderBottom: '1px solid #eee',
          px: 0,
          minHeight: isMobile ? 120 : 220,
          boxShadow: 'none',
          overflow: 'visible',
        }}
      >
        <Box sx={{ position: 'relative', width: '100%', minHeight: isMobile ? 120 : 220 }}>
          {/* Carousel d'images */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              zIndex: 0,
              '& .slick-slide img': {
                width: '100%',
                height: isMobile ? 120 : 220,
                objectFit: 'cover',
                borderRadius: 0,
                filter: 'brightness(0.85) grayscale(0.1)',
                transition: 'filter 0.3s'
              }
            }}
          >
            <Slider {...sliderSettings}>
              {images.map((src, idx) => (
                <img key={idx} src={src} alt={`header-img-${idx + 1}`} />
              ))}
            </Slider>
          </Box>
          {/* Contenu du header */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              textShadow: '0 2px 8px rgba(0,0,0,0.25)',
              px: 2,
            }}
          >
            <Typography variant={isMobile ? "h5" : "h3"} sx={{ fontWeight: 700, mb: 1 }}>
              Working with the best
            </Typography>
            <Typography variant={isMobile ? "body2" : "h6"} sx={{ mb: 2, maxWidth: 600, textAlign: 'center' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.
            </Typography>
            <Button
              variant="contained"
              color="warning"
              size={isMobile ? "small" : "large"}
              sx={{ fontWeight: 600, borderRadius: 2, px: 4, boxShadow: 2 }}
              href="https://www.sodeico.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Découvrir les offres
            </Button>
          </Box>
          <Toolbar
            disableGutters
            sx={{
              minHeight: isMobile ? 120 : 220,
              px: 0,
              position: 'relative',
              zIndex: 1,
              background: 'transparent'
            }}
          />
        </Box>
      </AppBar>

      {/* Main */}
      <Container
        maxWidth="lg"
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          px: { xs: 0, sm: 2 },
          py: { xs: 2, sm: 6 },
        }}
      >
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

        <StyledPaper
          sx={{
            maxWidth: 400, // réduit la largeur de la card
            margin: '0 auto',
            p: { xs: 3, sm: 4 }, // réduit le padding
          }}
        >
          <Box
            sx={{
              width: '100%',
              textAlign: 'center',
              mb: 3,
              mt: { xs: 2, sm: 3 }
            }}
          >
            <Typography
              variant={isMobile ? 'h6' : 'h5'}
              sx={{
                fontWeight: 700,
                color: theme.palette.text.primary,
                mb: 1,
                fontSize: isMobile ? '1rem' : '1.2rem'
              }}
            >
              Bienvenue sur la plateforme de Recrutement
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                mb: 2,
                color: theme.palette.text.secondary,
                fontSize: isMobile ? '0.8rem' : '0.95rem'
              }}
            >
              Découvrez des opportunités passionnantes et simplifiez votre processus de recrutement
            </Typography>
            <Box sx={{ width: 40, height: 3, bgcolor: theme.palette.warning.main, mx: 'auto', borderRadius: 2, mb: 1 }} />
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 2,
              my: 1
            }}
          >
            <AnimatedButton
              variant="contained"
              color="warning"
              component={Link}
              to="/candidate"
              size="small"
              sx={{
                py: 0.2,
                px: 1.5,
                borderRadius: 2,
                minWidth: 90,
                fontWeight: 700,
                fontSize: '0.85rem',
                boxShadow: 1
              }}
            >
              Espace Candidat
            </AnimatedButton>
            <AnimatedButton
              variant="outlined"
              color="warning"
              component={Link}
              to="/admin"
              size="small"
              sx={{
                py: 0.2,
                px: 1.5,
                borderRadius: 2,
                borderWidth: 2,
                minWidth: 90,
                fontWeight: 700,
                fontSize: '0.85rem',
                '&:hover': {
                  borderWidth: 2
                }
              }}
            >
              Espace Admin
            </AnimatedButton>
          </Box>
        </StyledPaper>

        <Grid
          container
          spacing={3}
          sx={{
            my: 4,
            justifyContent: 'center',
            alignItems: 'stretch',
            flexWrap: 'wrap',
          }}
        >
          {/* Nos partenaires */}
          <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex' }}>
            <Paper
              elevation={6}
              sx={{
                p: 3,
                textAlign: 'center',
                borderRadius: 4,
                width: '100%',
                minWidth: 280,
                maxWidth: 370,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 4px 24px 0 rgba(255, 193, 7, 0.08)',
                minHeight: 340,
                maxHeight: 380,
                bgcolor: 'background.paper',
                mx: 'auto'
              }}
            >
              <BusinessCenterIcon sx={{ fontSize: 44, color: 'warning.main', mb: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                Nos partenaires
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                Nous collaborons avec des entreprises et organisations de renom pour offrir à nos candidats les meilleures opportunités du marché.
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                <img
                  src={require('../Assets/world-bank-logo.png')}
                  alt="World Bank"
                  style={{ height: 132, width: 'auto', opacity: 0.95, borderRadius: 8 }} // Agrandi l'image
                />
              </Box>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                World Bank
              </Typography>
            </Paper>
          </Grid>

          {/* Nos chiffres clés */}
          <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex' }}>
            <Paper
              elevation={6}
              sx={{
                p: 3,
                textAlign: 'center',
                borderRadius: 4,
                width: '100%',
                minWidth: 280,
                maxWidth: 370,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 4px 24px 0 rgba(255, 193, 7, 0.08)',
                minHeight: 340,
                maxHeight: 380,
                bgcolor: 'background.paper',
                mx: 'auto'
              }}
            >
              <BarChartIcon sx={{ fontSize: 44, color: 'warning.main', mb: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                Nos chiffres clés
              </Typography>
              <Box
                component="ul"
                sx={{
                  color: 'text.secondary',
                  textAlign: 'left',
                  pl: 2,
                  fontSize: '1rem',
                  mb: 0,
                  width: '100%',
                  maxWidth: 240,
                  mx: 'auto',
                  '& li': { mb: 0.5, mt: 0.5, lineHeight: 1.3, padding: 0 } // Réduit l'espacement entre les lignes
                }}
              >
                <li>500+ candidats inscrits</li>
                <li>120 entreprises partenaires</li>
                <li>Plus de 300 offres publiées chaque mois</li>
              </Box>
            </Paper>
          </Grid>

          {/* Témoignages */}
          <Grid item xs={12} md={4} sx={{ display: 'flex' }}>
            <Paper
              elevation={6}
              sx={{
                p: 3,
                textAlign: 'center',
                borderRadius: 4,
                width: '100%',
                minWidth: 280,
                maxWidth: 370,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 4px 24px 0 rgba(255, 193, 7, 0.08)',
                minHeight: 340,
                maxHeight: 380,
                bgcolor: 'background.paper',
                mx: 'auto'
              }}
            >
              <FormatQuoteIcon sx={{ fontSize: 44, color: 'warning.main', mb: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                Témoignages
              </Typography>
              <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.secondary', mb: 2 }}>
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac neque nec nisi cursus dictum."
                <br />
                <Box component="span" sx={{ fontWeight: 700, color: 'text.primary' }}>— Jean Dupont, candidat satisfait</Box>
              </Typography>
              <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
                "Suspendisse potenti. Pellentesque habitant morbi tristique senectus et netus."
                <br />
                <Box component="span" sx={{ fontWeight: 700, color: 'text.primary' }}>— Marie Claire, recruteuse</Box>
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          bgcolor: '#181818',
          color: '#fff',
          py: 4,
          position: 'relative',
          overflow: 'hidden',
          zIndex: 1,
        }}
      >
        <Container maxWidth="lg">
          <Grid
            container
            spacing={4}
            alignItems="flex-start"
            justifyContent="space-between"
            sx={{
              flexWrap: { xs: 'wrap', md: 'nowrap' },
              textAlign: { xs: 'center', md: 'inherit' }
            }}
          >
            {/* À propos */}
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  À propos de nous
                </Typography>
                <Typography variant="body2" sx={{ color: '#ddd', mb: 1 }}>
                  Notre mission est de connecter <br></br> les meilleurs talents  avec les <br></br> entreprises qui les recherchent.
                </Typography>
                <Typography variant="body2" sx={{ color: '#ddd' }}>
                  Contactez-nous : contact@sodeico.org
                </Typography>
              </Box>
            </Grid>

            {/* Liens utiles */}
            <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  Liens utiles
                </Typography>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li>
                    <Button
                      component={Link}
                      to="/"
                      startIcon={<HomeIcon sx={{ color: '#ff9800' }} />}
                      sx={{
                        color: '#ddd',
                        textTransform: 'none',
                        justifyContent: 'center',
                        p: 0,
                        fontWeight: 600,
                        fontSize: 16,
                        '&:hover': {
                          color: '#ff9800',
                          textDecoration: 'underline',
                        }
                      }}
                    >
                      Accueil
                    </Button>
                  </li>
                  <li>
                    <Button
                      component={Link}
                      to="/candidate"
                      startIcon={<PersonIcon sx={{ color: '#ff9800' }} />}
                      sx={{
                        color: '#ddd',
                        textTransform: 'none',
                        justifyContent: 'center',
                        p: 0,
                        fontWeight: 600,
                        fontSize: 16,
                        '&:hover': {
                          color: '#ff9800',
                          textDecoration: 'underline',
                        }
                      }}
                    >
                      Espace Candidat
                    </Button>
                  </li>
                  <li>
                    <Button
                      component={Link}
                      to="/admin"
                      startIcon={<AdminPanelSettingsIcon sx={{ color: '#ff9800' }} />}
                      sx={{
                        color: '#ddd',
                        textTransform: 'none',
                        justifyContent: 'center',
                        p: 0,
                        fontWeight: 600,
                        fontSize: 16,
                        '&:hover': {
                          color: '#ff9800',
                          textDecoration: 'underline',
                        }
                      }}
                    >
                      Espace Admin
                    </Button>
                  </li>
                </ul>
              </Box>
            </Grid>

            {/* Réseaux sociaux */}
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: { xs: 'center', md: 'right' } }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  Suivez-nous
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: { xs: 'center', md: 'flex-end' } }}>
                  <IconButton
                    component="a"
                    href="https://www.facebook.com/sodeico"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: '#ff9800',
                      bgcolor: 'rgba(255,152,0,0.08)',
                      '&:hover': {
                        color: '#fff',
                        bgcolor: '#ff9800',
                      }
                    }}
                    aria-label="Facebook"
                  >
                    <FacebookIcon />
                  </IconButton>
                  <IconButton
                    component="a"
                    href="https://twitter.com/sodeico"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: '#ff9800',
                      bgcolor: 'rgba(255,152,0,0.08)',
                      '&:hover': {
                        color: '#fff',
                        bgcolor: '#ff9800',
                      }
                    }}
                    aria-label="Twitter"
                  >
                    <TwitterIcon />
                  </IconButton>
                  <IconButton
                    component="a"
                    href="https://www.linkedin.com/company/sodeico"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: '#ff9800',
                      bgcolor: 'rgba(255,152,0,0.08)',
                      '&:hover': {
                        color: '#fff',
                        bgcolor: '#ff9800',
                      }
                    }}
                    aria-label="LinkedIn"
                  >
                    <LinkedInIcon />
                  </IconButton>
                  <IconButton
                    component="a"
                    href="https://www.instagram.com/sodeico"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: '#ff9800',
                      bgcolor: 'rgba(255,152,0,0.08)',
                      '&:hover': {
                        color: '#fff',
                        bgcolor: '#ff9800',
                      }
                    }}
                    aria-label="Instagram"
                  >
                    <InstagramIcon />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
        <Box
          sx={{
            bgcolor: '#101010',
            color: '#777',
            py: 2,
            textAlign: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Container maxWidth="lg">
            <Typography variant="body2" sx={{ mb: 1 }}>
              © {new Date().getFullYear()} Sodeico. Tous droits réservés.
            </Typography>
            <Typography variant="body2">
              Mentions légales | Politique de confidentialité
            </Typography>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;