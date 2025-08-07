import React, { useEffect, useState } from 'react';
import { Paper, Typography, Avatar, Stack, Button, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';

const CandidateDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statut, setStatut] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [historique, setHistorique] = useState([]);

  // Charger le candidat depuis Firestore
  useEffect(() => {
    const fetchCandidate = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, 'candidats', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setCandidate({ id: docSnap.id, ...data });
          setStatut(data.statut || 'En attente');
          setHistorique(data.historique || []);
        } else {
          setCandidate(null);
        }
      } catch (error) {
        setCandidate(null);
      }
      setLoading(false);
    };
    fetchCandidate();
  }, [id]);

  // Ajoute une entrée à l'historique et met à jour Firestore
  const updateStatut = async (nouveauStatut) => {
    if (!candidate) return;
    const date = new Date().toISOString().slice(0, 10);
    const newHistorique = [...(historique || []), { statut: nouveauStatut, date }];
    setStatut(nouveauStatut);
    setHistorique(newHistorique);
    try {
      await updateDoc(doc(db, 'candidats', candidate.id), {
        statut: nouveauStatut,
        historique: newHistorique,
      });
    } catch (e) {
      // Optionnel: afficher une notification d'erreur
    }
  };

  const handleValidate = () => updateStatut('Validé');
  const handleReject = () => updateStatut('Rejeté');
  const handleDelete = () => setOpenDialog(true);

  const handleConfirmDelete = async () => {
    if (!candidate) return;
    setLoading(true);
    try {
      await deleteDoc(doc(db, 'candidats', candidate.id));
      setCandidate(null);
      setOpenDialog(false);
      setLoading(false);
      navigate('/admin'); // Redirige vers la liste après suppression
    } catch (e) {
      setLoading(false);
      setOpenDialog(false);
    }
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
      {/* Historique des statuts */}
      <Typography variant="h6" sx={{ mt: 3 }}>Historique des statuts</Typography>
      <ul>
        {historique && historique.map((h, idx) => (
          <li key={idx}>
            {h.statut} — {h.date}
          </li>
        ))}
      </ul>
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