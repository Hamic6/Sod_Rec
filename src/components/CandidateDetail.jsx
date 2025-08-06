import React, { useEffect, useState } from 'react';
import { Paper, Typography, Avatar, Stack, Button, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useParams } from 'react-router-dom';

// MOCK pour démo
const mockCandidate = {
  id: 1,
  nom: 'Jean',
  postnom: 'Dupont',
  prenom: 'Paul',
  email: 'jean@mail.com',
  telephone: '0999999999',
  adresse: 'Kinshasa',
  sexe: 'Masculin',
  dateNaissance: '1995-01-01',
  nationalite: 'Congolaise',
  age: 30,
  diplomeL3: 'L3',
  domaine: 'Sciences sociales',
  pourcentage: 70,
  anneeDiplome: 2020,
  photo: '', // url ou base64
  cv: '', // url ou nom de fichier
  diplome: '', // url ou nom de fichier
  statut: 'En attente',
};

const CandidateDetail = () => {
  const { id } = useParams();
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statut, setStatut] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setCandidate(mockCandidate);
      setStatut(mockCandidate.statut);
      setLoading(false);
    }, 800);
    // getCandidateById(id).then(data => { setCandidate(data); setStatut(data.statut); setLoading(false); });
  }, [id]);

  const handleValidate = () => setStatut('Validé');
  const handleReject = () => setStatut('Rejeté');
  const handleDelete = () => setOpenDialog(true);
  const handleConfirmDelete = () => {
    setCandidate(null);
    setOpenDialog(false);
  };
  const handleCancelDelete = () => setOpenDialog(false);

  if (loading) return <CircularProgress color="warning" sx={{ m: 4 }} />;

  if (!candidate) return <Typography sx={{ mt: 4, textAlign: 'center' }}>Candidat supprimé ou introuvable.</Typography>;

  return (
    <Paper sx={{ p: 4, maxWidth: 500, mx: 'auto', mt: 4, borderRadius: 4 }}>
      <Stack alignItems="center" spacing={2}>
        <Avatar
          src={candidate.photo || undefined}
          sx={{ width: 90, height: 90, border: '2px solid #ff9800', fontSize: 32 }}
        >
          {(!candidate.photo && candidate.prenom) ? candidate.prenom[0] : ''}
        </Avatar>
        <Typography variant="h5" fontWeight={700}>
          {candidate.nom} {candidate.postnom} {candidate.prenom}
        </Typography>
        <Typography color="text.secondary">{candidate.email}</Typography>
        <Typography variant="subtitle2" sx={{ mt: 1 }}>
          <b>Statut :</b> <span style={{
            color: statut === 'Validé' ? '#388e3c' : statut === 'Rejeté' ? '#d32f2f' : '#ff9800',
            fontWeight: 600
          }}>{statut}</span>
        </Typography>
      </Stack>
      <Stack spacing={1} sx={{ mt: 3 }}>
        <Typography><b>Téléphone :</b> {candidate.telephone}</Typography>
        <Typography><b>Adresse :</b> {candidate.adresse}</Typography>
        <Typography><b>Sexe :</b> {candidate.sexe}</Typography>
        <Typography><b>Date de naissance :</b> {candidate.dateNaissance}</Typography>
        <Typography><b>Nationalité :</b> {candidate.nationalite}</Typography>
        <Typography><b>Âge :</b> {candidate.age}</Typography>
        <Typography><b>Diplôme :</b> {candidate.diplomeL3}</Typography>
        <Typography><b>Domaine :</b> {candidate.domaine}</Typography>
        <Typography><b>Pourcentage :</b> {candidate.pourcentage} %</Typography>
        <Typography><b>Année d’obtention :</b> {candidate.anneeDiplome}</Typography>
        <Button
          variant="outlined"
          color="warning"
          href={candidate.cv}
          target="_blank"
          sx={{ mt: 2 }}
          disabled={!candidate.cv}
        >
          Voir le CV
        </Button>
        <Button
          variant="outlined"
          color="warning"
          href={candidate.diplome}
          target="_blank"
          sx={{ mt: 1 }}
          disabled={!candidate.diplome}
        >
          Voir le diplôme
        </Button>
      </Stack>
      {/* Actions admin */}
      <Stack direction="row" spacing={2} sx={{ mt: 4, justifyContent: 'center' }}>
        <Button
          variant="contained"
          color="success"
          onClick={handleValidate}
          disabled={statut === 'Validé'}
        >
          Valider
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleReject}
          disabled={statut === 'Rejeté'}
        >
          Rejeter
        </Button>
        <Button
          variant="outlined"
          color="warning"
          onClick={handleDelete}
        >
          Supprimer
        </Button>
      </Stack>
      {/* Dialog de confirmation suppression */}
      <Dialog open={openDialog} onClose={handleCancelDelete}>
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>
          <Typography>Voulez-vous vraiment supprimer ce candidat ?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Annuler</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">Supprimer</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default CandidateDetail;