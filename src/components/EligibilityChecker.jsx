import React, { useState } from 'react';
import { TextField, Button, Typography, Stack } from '@mui/material';

const EligibilityChecker = () => {
  const [age, setAge] = useState('');
  const [nationalite, setNationalite] = useState('');
  const [pourcentage, setPourcentage] = useState('');
  const [diplome, setDiplome] = useState('');
  const [isEligible, setIsEligible] = useState(null);

  const checkEligibility = () => {
    const ageOk = Number(age) <= 30;
    const natOk = nationalite.trim().toLowerCase() === 'congolaise';
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
          label="Diplôme (ex: L3, BAC+5)"
          variant="outlined"
          value={diplome}
          onChange={e => setDiplome(e.target.value)}
        />
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
          label="Nationalité"
          variant="outlined"
          value={nationalite}
          onChange={e => setNationalite(e.target.value)}
        />
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