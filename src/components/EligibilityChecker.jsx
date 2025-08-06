import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';

const EligibilityChecker = () => {
  const [criteria, setCriteria] = useState('');
  const [isEligible, setIsEligible] = useState(null);

  const checkEligibility = () => {
    // Placeholder logic for eligibility check
    const eligibleCriteria = ['Bachelor\'s Degree', '3+ Years Experience'];
    setIsEligible(eligibleCriteria.includes(criteria));
  };

  return (
    <div>
      <Typography variant="h5">Vérificateur d'Éligibilité</Typography>
      <TextField
        label="Entrez vos critères"
        variant="outlined"
        value={criteria}
        onChange={(e) => setCriteria(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={checkEligibility}>
        Vérifier l'Éligibilité
      </Button>
      {isEligible !== null && (
        <Typography variant="h6">
          {isEligible ? 'Vous êtes éligible!' : 'Désolé, vous n\'êtes pas éligible.'}
        </Typography>
      )}
    </div>
  );
};

export default EligibilityChecker;