import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Typography, TextField, MenuItem, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Utilise le mock directement ici, sans import ni export en double
const mockCandidates = [
  { id: 1, nom: 'Jean Dupont', email: 'jean@mail.com', statut: 'En attente' },
  { id: 2, nom: 'Marie Curie', email: 'marie@mail.com', statut: 'Validé' },
];

// Fonction locale pour simuler l'appel API
const getAllCandidates = async () => {
  return new Promise((resolve) => setTimeout(() => resolve(mockCandidates), 500));
};

const statuts = [
  { value: '', label: 'Tous' },
  { value: 'En attente', label: 'En attente' },
  { value: 'Validé', label: 'Validé' },
  { value: 'Rejeté', label: 'Rejeté' },
];

const CandidateList = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatut, setFilterStatut] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getAllCandidates().then(data => {
      setCandidates(data);
      setLoading(false);
    });
  }, []);

  const filtered = candidates.filter(c =>
    (c.nom.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()))
    && (filterStatut ? c.statut === filterStatut : true)
  );

  if (loading) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <CircularProgress color="warning" />
        <Typography sx={{ mt: 2 }}>Chargement des candidats...</Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 2 }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
        <TextField
          label="Recherche (nom ou email)"
          value={search}
          onChange={e => setSearch(e.target.value)}
          variant="outlined"
          size="small"
        />
        <TextField
          select
          label="Filtrer par statut"
          value={filterStatut}
          onChange={e => setFilterStatut(e.target.value)}
          variant="outlined"
          size="small"
          sx={{ minWidth: 180 }}
        >
          {statuts.map(option => (
            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
          ))}
        </TextField>
      </Stack>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Statut</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align="center">Aucun candidat trouvé.</TableCell>
              </TableRow>
            ) : (
              filtered.map((c) => (
                <TableRow
                  key={c.id}
                  hover
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/candidat/${c.id}`)}
                >
                  <TableCell>{c.nom}</TableCell>
                  <TableCell>{c.email}</TableCell>
                  <TableCell>{c.statut}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default CandidateList;