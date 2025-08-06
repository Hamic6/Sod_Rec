import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Stack,
  Avatar,
  MenuItem,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const initialState = {
  nom: '',
  postnom: '',
  prenom: '',
  email: '',
  telephone: '',
  adresse: '',
  sexe: '',
  dateNaissance: '',
  nationalite: '',
  age: '',
  diplomeL3: '',
  domaine: '',
  pourcentage: '',
  anneeDiplome: '',
  cv: null,
  diplome: null,
  photo: null,
};

const CandidateForm = () => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);

  // Validation simple
  const validate = () => {
    let temp = {};
    temp.nom = values.nom ? "" : "Le nom est requis";
    temp.postnom = values.postnom ? "" : "Le postnom est requis";
    temp.prenom = values.prenom ? "" : "Le prénom est requis";
    temp.email = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email) ? "" : "Email invalide";
    temp.telephone = values.telephone ? "" : "Téléphone requis";
    temp.adresse = values.adresse ? "" : "Adresse requise";
    temp.sexe = values.sexe ? "" : "Sexe requis";
    temp.dateNaissance = values.dateNaissance ? "" : "Date de naissance requise";
    temp.nationalite = values.nationalite ? "" : "Nationalité requise";
    temp.age = values.age ? "" : "Age requis";
    temp.diplomeL3 = values.diplomeL3 ? "" : "Diplôme requis";
    temp.domaine = values.domaine ? "" : "Domaine requis";
    temp.pourcentage = values.pourcentage ? "" : "Pourcentage requis";
    temp.anneeDiplome = values.anneeDiplome ? "" : "Année d'obtention du diplôme requise";
    temp.cv = values.cv ? "" : "CV requis";
    temp.diplome = values.diplome ? "" : "Diplôme requis";
    temp.photo = values.photo ? "" : "Photo passeport requise";
    setErrors(temp);
    return Object.values(temp).every(x => x === "");
  };

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === "photo" && files && files[0]) {
      setValues({
        ...values,
        [name]: files[0]
      });
      setPhotoPreview(URL.createObjectURL(files[0]));
    } else {
      setValues({
        ...values,
        [name]: files ? files[0] : value
      });
    }
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setSuccess(false);

    // Simule l'envoi (remplace par ton appel API/Firebase)
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      setValues(initialState);
      setPhotoPreview(null);
    }, 1800);
  };

  // Pour la liste des années (diplôme)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  return (
    <Paper
      elevation={6}
      sx={{
        p: { xs: 2, sm: 4 },
        maxWidth: 600,
        mx: 'auto',
        mt: 4,
        borderRadius: 4,
        background: 'linear-gradient(135deg, #fffbe6 0%, #fff 100%)',
        boxShadow: 8,
      }}
    >
      <Stack alignItems="center" spacing={1} sx={{ mb: 2 }}>
        <Box sx={{ position: 'relative', mb: 1 }}>
          <Avatar
            src={photoPreview || undefined}
            sx={{
              bgcolor: 'grey.200',
              width: 90,
              height: 90,
              border: '2px solid #ff9800',
              fontSize: 32,
            }}
          >
            {!photoPreview && <PhotoCamera fontSize="large" color="warning" />}
          </Avatar>
          <Button
            component="label"
            variant="contained"
            color={errors.photo ? "error" : "warning"}
            sx={{
              minWidth: 0,
              p: 1,
              borderRadius: '50%',
              position: 'absolute',
              bottom: 0,
              right: 0,
              boxShadow: 2,
            }}
          >
            <PhotoCamera />
            <input
              type="file"
              name="photo"
              accept=".jpg,.jpeg,.png"
              hidden
              onChange={handleChange}
            />
          </Button>
        </Box>
        {errors.photo && <Typography color="error" variant="caption">{errors.photo}</Typography>}
        <Typography variant="h5" fontWeight={700} color="warning.main">
          Formulaire de candidature
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" align="center">
          Remplissez le formulaire ci-dessous pour postuler.
        </Typography>
      </Stack>
      <form onSubmit={handleSubmit} noValidate>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            label="Nom"
            name="nom"
            value={values.nom}
            onChange={handleChange}
            error={!!errors.nom}
            helperText={errors.nom}
            fullWidth
            margin="normal"
            variant="outlined"
            InputProps={{ sx: { borderRadius: 3 } }}
          />
          <TextField
            label="Postnom"
            name="postnom"
            value={values.postnom}
            onChange={handleChange}
            error={!!errors.postnom}
            helperText={errors.postnom}
            fullWidth
            margin="normal"
            variant="outlined"
            InputProps={{ sx: { borderRadius: 3 } }}
          />
          <TextField
            label="Prénom"
            name="prenom"
            value={values.prenom}
            onChange={handleChange}
            error={!!errors.prenom}
            helperText={errors.prenom}
            fullWidth
            margin="normal"
            variant="outlined"
            InputProps={{ sx: { borderRadius: 3 } }}
          />
        </Stack>
        <TextField
          label="E-mail"
          name="email"
          value={values.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          fullWidth
          margin="normal"
          variant="outlined"
          InputProps={{ sx: { borderRadius: 3 } }}
        />
        <TextField
          label="Téléphone"
          name="telephone"
          value={values.telephone}
          onChange={handleChange}
          error={!!errors.telephone}
          helperText={errors.telephone}
          fullWidth
          margin="normal"
          variant="outlined"
          InputProps={{ sx: { borderRadius: 3 } }}
        />
        <TextField
          label="Adresse physique"
          name="adresse"
          value={values.adresse}
          onChange={handleChange}
          error={!!errors.adresse}
          helperText={errors.adresse}
          fullWidth
          margin="normal"
          variant="outlined"
          InputProps={{ sx: { borderRadius: 3 } }}
        />
        <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
          <TextField
            select
            label="Sexe"
            name="sexe"
            value={values.sexe}
            onChange={handleChange}
            error={!!errors.sexe}
            helperText={errors.sexe}
            fullWidth
            margin="normal"
            variant="outlined"
            InputProps={{ sx: { borderRadius: 3 } }}
          >
            <MenuItem value="">Sélectionner</MenuItem>
            <MenuItem value="Masculin">Masculin</MenuItem>
            <MenuItem value="Féminin">Féminin</MenuItem>
          </TextField>
          <TextField
            label="Date de naissance"
            name="dateNaissance"
            type="date"
            value={values.dateNaissance}
            onChange={handleChange}
            error={!!errors.dateNaissance}
            helperText={errors.dateNaissance}
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            InputProps={{ sx: { borderRadius: 3 } }}
          />
        </Stack>
        <Stack direction="row" spacing={2}>
          <TextField
            label="Nationalité"
            name="nationalite"
            value={values.nationalite}
            onChange={handleChange}
            error={!!errors.nationalite}
            helperText={errors.nationalite}
            fullWidth
            margin="normal"
            variant="outlined"
            InputProps={{ sx: { borderRadius: 3 } }}
          />
          <TextField
            label="Âge"
            name="age"
            type="number"
            value={values.age}
            onChange={handleChange}
            error={!!errors.age}
            helperText={errors.age}
            fullWidth
            margin="normal"
            variant="outlined"
            InputProps={{ sx: { borderRadius: 3 }, inputProps: { min: 0, max: 100 } }}
          />
        </Stack>
        <Stack direction="row" spacing={2}>
          <TextField
            label="Diplôme (ex: L3, BAC+5)"
            name="diplomeL3"
            value={values.diplomeL3}
            onChange={handleChange}
            error={!!errors.diplomeL3}
            helperText={errors.diplomeL3}
            fullWidth
            margin="normal"
            variant="outlined"
            InputProps={{ sx: { borderRadius: 3 } }}
          />
          <TextField
            label="Domaine (Sciences sociales, Ingénierie, ...)"
            name="domaine"
            value={values.domaine}
            onChange={handleChange}
            error={!!errors.domaine}
            helperText={errors.domaine}
            fullWidth
            margin="normal"
            variant="outlined"
            InputProps={{ sx: { borderRadius: 3 } }}
          />
        </Stack>
        <TextField
          label="Pourcentage obtenu (%)"
          name="pourcentage"
          type="number"
          value={values.pourcentage}
          onChange={handleChange}
          error={!!errors.pourcentage}
          helperText={errors.pourcentage}
          fullWidth
          margin="normal"
          variant="outlined"
          InputProps={{ sx: { borderRadius: 3 }, inputProps: { min: 0, max: 100 } }}
        />
        <TextField
          select
          label="Année d’obtention de diplôme"
          name="anneeDiplome"
          value={values.anneeDiplome}
          onChange={handleChange}
          error={!!errors.anneeDiplome}
          helperText={errors.anneeDiplome}
          fullWidth
          margin="normal"
          variant="outlined"
          InputProps={{ sx: { borderRadius: 3 } }}
        >
          <MenuItem value="">Sélectionner</MenuItem>
          {years.map((year) => (
            <MenuItem key={year} value={year}>{year}</MenuItem>
          ))}
        </TextField>
        <Stack direction="row" spacing={2} sx={{ mt: 2, mb: 1 }}>
          <Button
            variant={values.cv ? "contained" : "outlined"}
            component="label"
            color={errors.cv ? "error" : "warning"}
            startIcon={values.cv ? <CheckCircleIcon /> : <UploadFileIcon />}
            sx={{
              flex: 1,
              borderRadius: 3,
              textTransform: 'none',
              bgcolor: values.cv ? 'warning.main' : undefined,
              color: values.cv ? '#fff' : undefined,
              '&:hover': {
                bgcolor: values.cv ? 'warning.dark' : undefined,
              }
            }}
          >
            {values.cv ? values.cv.name : "Téléverser le CV"}
            <input
              type="file"
              name="cv"
              accept=".pdf,.doc,.docx"
              hidden
              onChange={handleChange}
            />
          </Button>
          <Button
            variant={values.diplome ? "contained" : "outlined"}
            component="label"
            color={errors.diplome ? "error" : "warning"}
            startIcon={values.diplome ? <CheckCircleIcon /> : <UploadFileIcon />}
            sx={{
              flex: 1,
              borderRadius: 3,
              textTransform: 'none',
              bgcolor: values.diplome ? 'warning.main' : undefined,
              color: values.diplome ? '#fff' : undefined,
              '&:hover': {
                bgcolor: values.diplome ? 'warning.dark' : undefined,
              }
            }}
          >
            {values.diplome ? values.diplome.name : "Téléverser le diplôme"}
            <input
              type="file"
              name="diplome"
              accept=".pdf,.jpg,.jpeg,.png"
              hidden
              onChange={handleChange}
            />
          </Button>
        </Stack>
        {errors.cv && <Typography color="error" variant="caption">{errors.cv}</Typography>}
        {errors.diplome && <Typography color="error" variant="caption" sx={{ ml: 2 }}>{errors.diplome}</Typography>}

        <Box sx={{ mt: 3, position: 'relative' }}>
          <Button
            type="submit"
            variant="contained"
            color="warning"
            fullWidth
            size="large"
            sx={{
              borderRadius: 3,
              fontWeight: 700,
              fontSize: '1rem',
              py: 1.2,
              textTransform: 'none'
            }}
            disabled={submitting}
          >
            Envoyer la candidature
          </Button>
          {submitting && (
            <CircularProgress
              size={28}
              sx={{
                color: 'warning.main',
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-14px',
                marginLeft: '-14px',
              }}
            />
          )}
        </Box>
        {success && (
          <Alert severity="success" sx={{ mt: 3 }}>
            Candidature envoyée avec succès !
          </Alert>
        )}
      </form>
    </Paper>
  );
};

export default CandidateForm;