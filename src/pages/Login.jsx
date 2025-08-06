import React, { useState, useEffect } from 'react';
import { 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Stack, 
  Alert,
  Box,
  InputAdornment,
  IconButton,
  CircularProgress,
  Fade,
  Divider,
  Link,
  Tooltip,
  Zoom
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { 
  Email as EmailIcon, 
  Lock as LockIcon, 
  Visibility, 
  VisibilityOff,
  AccountCircle,
  ArrowForward,
  Info
} from '@mui/icons-material';
import { styled, alpha, useTheme } from '@mui/material/styles';
import SodeicoLogo from '../Assets/SODEICO.png';

const ADMIN_EMAIL = 'admin@mail.com';
const ADMIN_PASSWORD = 'admin123';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5),
  maxWidth: 450,
  margin: 'auto',
  borderRadius: theme.shape.borderRadius * 3,
  boxShadow: theme.shadows[15],
  background: alpha(theme.palette.background.paper, 0.92),
  backdropFilter: 'blur(12px)',
  border: `1px solid ${alpha(theme.palette.warning.light, 0.25)}`,
  position: 'relative',
  overflow: 'hidden',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: -50,
    right: -50,
    width: 100,
    height: 100,
    borderRadius: '50%',
    background: alpha(theme.palette.warning.light, 0.1),
    zIndex: -1
  }
}));

const LoginButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  padding: theme.spacing(1.75),
  fontWeight: 'bold',
  letterSpacing: 1.2,
  fontSize: '1rem',
  borderRadius: theme.shape.borderRadius * 2,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[6],
  },
}));

const AnimatedIconButton = styled(IconButton)({
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.2)',
    color: 'warning.dark'
  },
});

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    setTimeout(() => {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        localStorage.setItem('isAdmin', 'true');
        navigate('/admin');
      } else {
        setError('Identifiants incorrects - Veuillez réessayer');
        setShake(true);
      }
      setIsLoading(false);
    }, 1200);
  };

  useEffect(() => {
    if (shake) {
      const timer = setTimeout(() => setShake(false), 500);
      return () => clearTimeout(timer);
    }
  }, [shake]);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f5f5f5', // au lieu de #fff
        position: 'relative', // <-- important
        padding: 2,
      }}
    >
      {/* Logo centré en haut */}
      <Box
        sx={{
          position: 'absolute',
          top: { xs: 24, md: 40 },
          left: 0,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          zIndex: 2,
        }}
      >
        <img
          src={SodeicoLogo}
          alt="SODEICO"
          style={{
            height: 60,
            objectFit: 'contain',
            filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.06))',
          }}
        />
      </Box>

      {/* Logos décoratifs en arrière-plan */}
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
        {/* Logo 1 : en haut à gauche, grand */}
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
        {/* Logo 2 : en bas à droite, grand */}
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
        {/* Logo 3 : au centre droit, moyen */}
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
        {/* Logo 4 : en bas à gauche, petit */}
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

      <StyledPaper elevation={10} sx={{
        mt: { xs: 10, md: 12 },
        animation: shake ? `${theme.transitions.create(['transform'], {
          duration: theme.transitions.duration.shorter,
          easing: theme.transitions.easing.easeInOut,
        })} 0.5s ease-in-out` : 'none',
        transform: shake ? 'translateX(-5px)' : 'none',
        // Ajoute une bordure noire légère pour le contraste
        border: `1.5px solid ${alpha('#181818', 0.08)}`,
      }}>
        <Box textAlign="center" mb={4}>
          <AccountCircle 
            sx={{ 
              fontSize: 60, 
              color: 'warning.main',
              mb: 1,
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
              }
            }} 
          />
          <Typography 
            variant="h4" 
            fontWeight={800} 
            color="#181818" // Titre bien noir
            gutterBottom
            sx={{
              textShadow: '0 2px 4px rgba(0,0,0,0.08)',
              letterSpacing: '0.5px',
              position: 'relative',
              display: 'inline-block',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: '25%',
                width: '50%',
                height: 3,
                background: 'linear-gradient(90deg, transparent, #ff9800, transparent)',
                borderRadius: 3
              }
            }}
          >
            Espace Administrateur
          </Typography>
          <Typography 
            variant="subtitle1" 
            color="text.primary" // Texte d'aide en noir
            sx={{ 
              opacity: 0.85,
              maxWidth: '80%',
              mx: 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1
            }}
          >
            <Info color="warning" fontSize="small" />
            Connectez-vous pour accéder au tableau de bord
          </Typography>
        </Box>

        {error && (
          <Zoom in={!!error}>
            <Alert 
              severity="error" 
              sx={{ 
                mb: 3,
                borderRadius: 2,
                alignItems: 'center',
                borderLeft: `4px solid ${theme.palette.error.dark}`,
                boxShadow: theme.shadows[1]
              }}
              icon={false}
            >
              <Typography fontWeight={500}>{error}</Typography>
            </Alert>
          </Zoom>
        )}

        <form onSubmit={handleLogin}>
          <Stack spacing={3.5}>
            <TextField
              label="Adresse Email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              fullWidth
              variant="outlined"
              color="warning"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="warning" sx={{ opacity: 0.8 }} />
                  </InputAdornment>
                ),
              }}
              placeholder="votre@email.com"
              InputLabelProps={{
                style: { color: '#181818', fontWeight: 600 }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '& fieldset': {
                    borderColor: 'warning.light',
                  },
                  '&:hover fieldset': {
                    borderColor: 'warning.main',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'warning.dark',
                    boxShadow: `0 0 0 2px ${alpha(theme.palette.warning.main, 0.2)}`
                  }
                },
              }}
            />
            
            <TextField
              label="Mot de passe"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              fullWidth
              variant="outlined"
              color="warning"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="warning" sx={{ opacity: 0.8 }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"} arrow>
                      <AnimatedIconButton
                        aria-label="toggle password visibility"
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                        sx={{ color: 'warning.main' }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </AnimatedIconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{
                style: { color: '#181818', fontWeight: 600 }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '& fieldset': {
                    borderColor: 'warning.light',
                  },
                  '&:hover fieldset': {
                    borderColor: 'warning.main',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'warning.dark',
                    boxShadow: `0 0 0 2px ${alpha(theme.palette.warning.main, 0.2)}`
                  }
                },
              }}
            />

            <Box textAlign="right" mt={-1}>
              <Tooltip title="Réinitialiser votre mot de passe" arrow>
                <Link 
                  href="#" 
                  variant="body2" 
                  color="#181818"
                  sx={{ 
                    textDecoration: 'none',
                    fontWeight: 600,
                    '&:hover': {
                      textDecoration: 'underline',
                      color: 'warning.dark'
                    },
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 0.5
                  }}
                >
                  Mot de passe oublié ?
                </Link>
              </Tooltip>
            </Box>

            <LoginButton
              type="submit"
              variant="contained"
              color="warning"
              size="large"
              disabled={isLoading}
              endIcon={isLoading ? null : <ArrowForward />}
              startIcon={isLoading ? <CircularProgress size={24} color="inherit" /> : null}
              sx={{
                background: 'linear-gradient(45deg, #ff9800 0%, #fb8c00 100%)',
                boxShadow: '0 4px 6px rgba(251, 140, 0, 0.2)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #fb8c00 0%, #f57c00 100%)',
                }
              }}
            >
              {isLoading ? 'Authentification en cours...' : 'Se connecter'}
            </LoginButton>
          </Stack>
        </form>

        <Divider sx={{ 
          my: 3, 
          borderColor: 'warning.light', 
          opacity: 0.5,
          position: 'relative',
          '&:before, &:after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            width: 20,
            height: 1,
            background: 'warning.light'
          },
          '&:before': {
            left: -24
          },
          '&:after': {
            right: -24
          }
        }} />

        <Box textAlign="center">
          <Typography variant="body2" color="text.secondary">
            Vous n'avez pas de compte ?{' '}
            <Tooltip title="Contactez l'administrateur système" arrow>
              <Link 
                href="#" 
                color="#181818"
                fontWeight={700}
                sx={{ 
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                    color: 'warning.dark'
                  },
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.5
                }}
              >
                Contactez le support
              </Link>
            </Tooltip>
          </Typography>
        </Box>
      </StyledPaper>
    </Box>
  );
};

export default Login;