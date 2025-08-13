import React, { useState } from 'react';
import { TextField, Button, Typography, Stack, MenuItem } from '@mui/material';
import countries from "i18n-iso-countries";
import fr from "i18n-iso-countries/langs/fr.json";

countries.registerLocale(fr);

const NATIONALITES = Object.entries(countries.getNames("fr", { select: "official" })).map(
  ([code, name]) => ({
    value: name,
    label: name
  })
);

const DIPLOMES = [
  { value: 'L3', label: 'Licence 3 (L3)' },
  { value: 'BAC+5', label: 'BAC +5' },
  { value: 'LICENCE', label: 'Licence' },
];

const EligibilityChecker = () => {
  const [age, setAge] = useState('');
  const [nationalite, setNationalite] = useState('');
  const [pourcentage, setPourcentage] = useState('');
  const [diplome, setDiplome] = useState('');
  const [isEligible, setIsEligible] = useState(null);

  const checkEligibility = () => {
    const ageOk = Number(age) <= 30;
    // On vérifie si la nationalité contient "République démocratique du Congo"
    const natOk = nationalite.trim() === 'République démocratique du Congo';
    const pourcOk = Number(pourcentage) >= 67;
    const diplomeOk = ['l3', 'bac+5', 'bac 5', 'bac +5', 'licence'].some(d =>
      diplome.trim().toLowerCase().includes(d)
    );
    setIsEligible(ageOk && natOk && pourcOk && diplomeOk);
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Vérificateur d'Éligibilité
      </Typography>
      <Stack spacing={2} sx={{ maxWidth: 400 }}>
        <TextField
          select
          label="Diplôme"
          value={diplome}
          onChange={e => setDiplome(e.target.value)}
        >
          <MenuItem value="">Sélectionner</MenuItem>
          {DIPLOMES.map(option => (
            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
          ))}
        </TextField>
        <TextField
          label="Pourcentage obtenu (%)"
          variant="outlined"
          type="number"
          value={pourcentage}
          onChange={e => setPourcentage(e.target.value)}
        />
        <TextField
          label="Âge"
          variant="outlined"
          type="number"
          value={age}
          onChange={e => setAge(e.target.value)}
        />
        <TextField
          select
          label="Nationalité"
          value={nationalite}
          onChange={e => setNationalite(e.target.value)}
        >
          <MenuItem value="">Sélectionner</MenuItem>
          {NATIONALITES.map(option => (
            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
          ))}
        </TextField>
        <Button variant="contained" color="primary" onClick={checkEligibility}>
          Vérifier l'Éligibilité
        </Button>
        {isEligible !== null && (
          <Typography variant="h6" color={isEligible ? 'success.main' : 'error.main'}>
            {isEligible
              ? 'Vous êtes éligible !'
              : 'Désolé, vous n\'êtes pas éligible.'}
          </Typography>
        )}
      </Stack>
    </div>
  );
};

export default EligibilityChecker;