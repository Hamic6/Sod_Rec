import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Typography,
  TextField, MenuItem, Stack, TablePagination, Snackbar, Alert, Avatar, IconButton, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DescriptionIcon from '@mui/icons-material/Description';
import DeleteIcon from '@mui/icons-material/Delete';
import { db } from '../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import Checkbox from '@mui/material/Checkbox';

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
  const [filterDomaine, setFilterDomaine] = useState('');
  const [filterEligibility, setFilterEligibility] = useState('eligible');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [sortBy, setSortBy] = useState('dateCandidature');
  const [sortOrder, setSortOrder] = useState('desc');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();

  // Charger les candidats depuis Firestore
  useEffect(() => {
    const fetchCandidates = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, 'candidats'));
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCandidates(data);
      } catch (e) {
        setCandidates([]);
      }
      setLoading(false);
    };
    fetchCandidates();
  }, []);

  // Récupère tous les domaines uniques pour le filtre
  const domaines = Array.from(new Set(candidates.map(c => c.domaine))).filter(Boolean);

  // Tri
  const sorted = [...candidates].sort((a, b) => {
    let valA = a[sortBy];
    let valB = b[sortBy];
    if (sortBy === 'dateCandidature' || sortBy === 'createdAt') {
      valA = new Date(valA?.toDate ? valA.toDate() : valA);
      valB = new Date(valB?.toDate ? valB.toDate() : valB);
    }
    if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
    if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  // Filtres
  const filtered = sorted.filter(c =>
    (c.nom?.toLowerCase().includes(search.toLowerCase()) || c.email?.toLowerCase().includes(search.toLowerCase()))
    && (filterStatut ? c.statut === filterStatut : true)
    && (filterDomaine ? c.domaine === filterDomaine : true)
  );

  // Fonction d'éligibilité automatique
  const isEligible = (c) => {
    const ageOk = Number(c.age) <= 30;
    const natOk = (c.nationalite || '').trim() === 'République démocratique du Congo';
    const pourcOk = Number(c.pourcentage) >= 67;
    const diplomeOk = ['l3', 'bac+5', 'bac 5', 'bac +5', 'licence'].some(d =>
      (c.diplomeL3 || '').toLowerCase().includes(d)
    );
    return ageOk && natOk && pourcOk && diplomeOk;
  };

  if (loading) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <CircularProgress color="warning" />
        <Typography sx={{ mt: 2 }}>Chargement des candidats...</Typography>
      </Paper>
    );
  }

  // Après avoir chargé les candidats
  const valides = filtered.filter(isEligible);
  const rejetes = filtered.filter(c => !isEligible(c));

  // Suppression individuelle Firestore
  const handleDelete = (id) => {
    setToDelete(id);
    setOpenDeleteDialog(true);
  };
  const handleConfirmDelete = async () => {
    try {
      // Si plusieurs sélectionnés, supprimer tous
      const idsToDelete = selected.length > 0 ? selected : [toDelete];
      await Promise.all(
        idsToDelete.map(id => deleteDoc(doc(db, 'candidats', id)))
      );
      setCandidates((prev) => prev.filter((c) => !idsToDelete.includes(c.id)));
      setSelected([]);
      setOpenDeleteDialog(false);
      setSnackbar({ open: true, message: `${idsToDelete.length} candidat(s) supprimé(s).`, severity: 'warning' });
    } catch (e) {
      setOpenDeleteDialog(false);
      setSnackbar({ open: true, message: "Erreur lors de la suppression.", severity: 'error' });
    }
  };
  const handleCancelDelete = () => {
    setOpenDeleteDialog(false);
    setToDelete(null);
  };

  // Tri colonne
  const handleSort = (col) => {
    if (sortBy === col) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(col);
      setSortOrder('asc');
    }
  };

  // Export CSV
  const handleExportCSV = (list) => {
    const header = ['Nom', 'Email', 'Statut', 'Domaine', 'Pourcentage', 'Date de candidature'];
    const rows = list.map(c => [c.nom, c.email, c.statut, c.domaine, c.pourcentage, c.dateCandidature]);
    const csv = [header, ...rows].map(r => r.join(';')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'candidats.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Pagination handlers à ajouter :
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelect = (id) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (list) => {
    if (selected.length === list.length) {
      setSelected([]);
    } else {
      setSelected(list.map(c => c.id));
    }
  };

  // Table rendering helper
  const renderTable = (list, label) => (
    <>
      <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>{label}</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selected.length === list.length && list.length > 0}
                  indeterminate={selected.length > 0 && selected.length < list.length}
                  onChange={() => handleSelectAll(list)}
                />
              </TableCell>
              <TableCell>Nom</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Statut</TableCell>
              <TableCell>Domaine</TableCell>
              <TableCell>Pourcentage</TableCell>
              <TableCell>Date de candidature</TableCell>
              <TableCell>Photo</TableCell>
              <TableCell>CV</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} align="center">Aucun candidat</TableCell>
              </TableRow>
            ) : (
              list
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((c) => (
                  <TableRow
                    key={c.id}
                    hover
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate(`/candidat/${c.id}`)}
                  >
                    <TableCell padding="checkbox" onClick={e => e.stopPropagation()}>
                      <Checkbox
                        checked={selected.includes(c.id)}
                        onChange={() => handleSelect(c.id)}
                      />
                    </TableCell>
                    <TableCell>{c.nom}</TableCell>
                    <TableCell>{c.email}</TableCell>
                    <TableCell>{c.statut}</TableCell>
                    <TableCell>{c.domaine}</TableCell>
                    <TableCell>{c.pourcentage} %</TableCell>
                    <TableCell>
                      {c.createdAt?.toDate
                        ? c.createdAt.toDate().toLocaleDateString()
                        : c.dateCandidature || ''}
                    </TableCell>
                    <TableCell onClick={e => e.stopPropagation()}>
                      <Avatar
                        src={c.photo || undefined}
                        alt={c.nom}
                        sx={{ width: 36, height: 36, bgcolor: 'grey.200' }}
                      >
                        {!c.photo && c.nom ? c.nom[0] : ''}
                      </Avatar>
                    </TableCell>
                    <TableCell onClick={e => e.stopPropagation()}>
                      {c.cv ? (
                        <Tooltip title="Voir le CV">
                          <IconButton href={c.cv} target="_blank" size="small">
                            <DescriptionIcon color="primary" />
                          </IconButton>
                        </Tooltip>
                      ) : (
                        <Typography variant="caption" color="text.secondary">Aucun</Typography>
                      )}
                    </TableCell>
                    <TableCell onClick={e => e.stopPropagation()}>
                      <Tooltip title="Supprimer">
                        <IconButton color="error" onClick={() => handleDelete(c.id)} size="small">
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={list.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Lignes par page"
      />
      <Button
        variant="outlined"
        color="primary"
        size="small"
        sx={{ mt: 1 }}
        onClick={() => handleExportCSV(list)}
      >
        Exporter CSV
      </Button>
    </>
  );

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
        <TextField
          select
          label="Filtrer par domaine"
          value={filterDomaine}
          onChange={e => setFilterDomaine(e.target.value)}
          variant="outlined"
          size="small"
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="">Tous domaines</MenuItem>
          {domaines.map(option => (
            <MenuItem key={option} value={option}>{option}</MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Éligibilité"
          value={filterEligibility}
          onChange={e => setFilterEligibility(e.target.value)}
          variant="outlined"
          size="small"
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="eligible">Éligibles</MenuItem>
          <MenuItem value="noneligible">Non éligibles</MenuItem>
        </TextField>
      </Stack>
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        {selected.length > 0 && (
          <>
            <Button
              variant="contained"
              color="error"
              onClick={() => setOpenDeleteDialog(true)}
            >
              Supprimer sélectionnés ({selected.length})
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleExportCSV(
                (filterEligibility === 'eligible' ? valides : rejetes)
                  .filter(c => selected.includes(c.id))
              )}
            >
              Exporter sélectionnés ({selected.length})
            </Button>
          </>
        )}
      </Stack>
      {filterEligibility === 'eligible' && renderTable(valides, "Candidats Éligibles")}
      {filterEligibility === 'noneligible' && renderTable(rejetes, "Candidats Non Éligibles")}
      {filterEligibility === 'all' && (
        <>
          {renderTable(valides, "Candidats Éligibles")}
          {renderTable(rejetes, "Candidats Non Éligibles")}
        </>
      )}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
      <Dialog open={openDeleteDialog} onClose={handleCancelDelete}>
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

export default CandidateList;