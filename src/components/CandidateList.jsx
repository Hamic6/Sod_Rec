import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Typography,
  TextField, MenuItem, Stack, TablePagination, Snackbar, Alert, Checkbox, Toolbar, Button, Avatar, IconButton, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DescriptionIcon from '@mui/icons-material/Description';
import DeleteIcon from '@mui/icons-material/Delete';

// Utilise le mock directement ici, sans import ni export en double
const mockCandidates = [
  {
    id: 1,
    nom: 'Jean Dupont',
    email: 'jean@mail.com',
    statut: 'En attente',
    domaine: 'Sciences sociales',
    pourcentage: 70,
    dateCandidature: '2025-08-06',
    photo: '', // url ou base64
    cv: '',
  },
  {
    id: 2,
    nom: 'Marie Curie',
    email: 'marie@mail.com',
    statut: 'Validé',
    domaine: 'Ingénierie',
    pourcentage: 85,
    dateCandidature: '2025-08-05',
    photo: '', // url ou base64
    cv: '',
  },
];

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
  const [filterDomaine, setFilterDomaine] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [sortBy, setSortBy] = useState('dateCandidature');
  const [sortOrder, setSortOrder] = useState('desc');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getAllCandidates().then(data => {
      setCandidates(data);
      setLoading(false);
    });
  }, []);

  // Récupère tous les domaines uniques pour le filtre
  const domaines = Array.from(new Set(candidates.map(c => c.domaine))).filter(Boolean);

  // Tri
  const sorted = [...candidates].sort((a, b) => {
    let valA = a[sortBy];
    let valB = b[sortBy];
    if (sortBy === 'dateCandidature') {
      valA = new Date(valA);
      valB = new Date(valB);
    }
    if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
    if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  // Filtres
  const filtered = sorted.filter(c =>
    (c.nom.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()))
    && (filterStatut ? c.statut === filterStatut : true)
    && (filterDomaine ? c.domaine === filterDomaine : true)
  );

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Sélection
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelected(filtered.map((c) => c.id));
    } else {
      setSelected([]);
    }
  };
  const handleSelectOne = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  // Actions groupées (mock)
  const handleBatchValidate = () => {
    setCandidates((prev) =>
      prev.map((c) =>
        selected.includes(c.id) ? { ...c, statut: 'Validé' } : c
      )
    );
    setSelected([]);
    setSnackbar({ open: true, message: 'Candidats validés avec succès.', severity: 'success' });
  };
  const handleBatchReject = () => {
    setCandidates((prev) =>
      prev.map((c) =>
        selected.includes(c.id) ? { ...c, statut: 'Rejeté' } : c
      )
    );
    setSelected([]);
    setSnackbar({ open: true, message: 'Candidats rejetés avec succès.', severity: 'info' });
  };

  // Suppression individuelle
  const handleDelete = (id) => {
    setToDelete(id);
    setOpenDeleteDialog(true);
  };
  const handleConfirmDelete = () => {
    setCandidates((prev) => prev.filter((c) => c.id !== toDelete));
    setSelected((prev) => prev.filter((id) => id !== toDelete));
    setOpenDeleteDialog(false);
    setSnackbar({ open: true, message: 'Candidat supprimé.', severity: 'warning' });
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
      <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
        <Button
          variant="contained"
          color="success"
          size="small"
          disabled={selected.length === 0}
          onClick={handleBatchValidate}
          sx={{ mr: 1 }}
        >
          Valider sélection
        </Button>
        <Button
          variant="contained"
          color="error"
          size="small"
          disabled={selected.length === 0}
          onClick={handleBatchReject}
        >
          Rejeter sélection
        </Button>
        <Typography sx={{ flex: 1 }} />
        <Typography variant="subtitle2">
          {selected.length} sélectionné(s)
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          sx={{ ml: 2 }}
          onClick={() => {
            // Export CSV simple
            const header = ['Nom', 'Email', 'Statut', 'Domaine', 'Pourcentage', 'Date de candidature'];
            const rows = filtered.map(c => [c.nom, c.email, c.statut, c.domaine, c.pourcentage, c.dateCandidature]);
            const csv = [header, ...rows].map(r => r.join(';')).join('\n');
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'candidats.csv';
            a.click();
            URL.revokeObjectURL(url);
          }}
        >
          Exporter CSV
        </Button>
      </Toolbar>
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
      </Stack>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={selected.length > 0 && selected.length < filtered.length}
                  checked={filtered.length > 0 && selected.length === filtered.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>
                <span style={{ cursor: 'pointer' }} onClick={() => handleSort('nom')}>
                  Nom {sortBy === 'nom' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
                </span>
              </TableCell>
              <TableCell>
                <span style={{ cursor: 'pointer' }} onClick={() => handleSort('email')}>
                  Email {sortBy === 'email' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
                </span>
              </TableCell>
              <TableCell>
                <span style={{ cursor: 'pointer' }} onClick={() => handleSort('statut')}>
                  Statut {sortBy === 'statut' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
                </span>
              </TableCell>
              <TableCell>
                <span style={{ cursor: 'pointer' }} onClick={() => handleSort('domaine')}>
                  Domaine {sortBy === 'domaine' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
                </span>
              </TableCell>
              <TableCell>
                <span style={{ cursor: 'pointer' }} onClick={() => handleSort('pourcentage')}>
                  Pourcentage {sortBy === 'pourcentage' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
                </span>
              </TableCell>
              <TableCell>
                <span style={{ cursor: 'pointer' }} onClick={() => handleSort('dateCandidature')}>
                  Date de candidature {sortBy === 'dateCandidature' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
                </span>
              </TableCell>
              <TableCell>Photo</TableCell>
              <TableCell>CV</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} align="center">Aucun candidat trouvé.</TableCell>
              </TableRow>
            ) : (
              filtered
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((c) => (
                  <TableRow
                    key={c.id}
                    hover
                    selected={selected.includes(c.id)}
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate(`/candidat/${c.id}`)}
                  >
                    <TableCell padding="checkbox" onClick={e => e.stopPropagation()}>
                      <Checkbox
                        checked={selected.includes(c.id)}
                        onChange={() => handleSelectOne(c.id)}
                      />
                    </TableCell>
                    <TableCell>{c.nom}</TableCell>
                    <TableCell>{c.email}</TableCell>
                    <TableCell>{c.statut}</TableCell>
                    <TableCell>{c.domaine}</TableCell>
                    <TableCell>{c.pourcentage} %</TableCell>
                    <TableCell>{c.dateCandidature}</TableCell>
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
        count={filtered.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Lignes par page"
      />
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