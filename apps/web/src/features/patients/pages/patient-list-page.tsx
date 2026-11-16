import { useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { parseApiError } from '../../../shared/api/errors';
import { paths } from '../../../shared/routing/paths';
import { PatientDeleteDialog } from '../components/patient-delete-dialog';
import { PatientFormDialog } from '../components/patient-form-dialog';
import { PatientTable } from '../components/patient-table';
import { useDeletePatient } from '../hooks/use-delete-patient';
import { usePatients } from '../hooks/use-patients';
import type { Patient } from '../types/patient-types';

export default function PatientListPage() {
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [isCreateOpen, setCreateOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [deletingPatient, setDeletingPatient] = useState<Patient | null>(null);

  const { data: patients = [], isLoading, isError, error } = usePatients();
  const deleteMutation = useDeletePatient();

  const filteredPatients = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) {
      return patients;
    }

    return patients.filter((patient) =>
      [patient.name, patient.cpf, patient.email].some((value) =>
        value.toLowerCase().includes(term),
      ),
    );
  }, [patients, search]);

  const deleteError = deleteMutation.error
    ? parseApiError(deleteMutation.error).message
    : null;

  function closeDeleteDialog() {
    if (deleteMutation.isPending) {
      return;
    }

    deleteMutation.reset();
    setDeletingPatient(null);
  }

  function confirmDelete() {
    if (!deletingPatient) {
      return;
    }

    deleteMutation.mutate(deletingPatient.id, {
      onSuccess: () => setDeletingPatient(null),
    });
  }

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return <Alert severity="error">{parseApiError(error).message}</Alert>;
  }

  return (
    <>
      <Stack spacing={2}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{
            justifyContent: 'space-between',
            alignItems: { xs: 'stretch', sm: 'center' },
          }}
        >
          <Typography variant="h4">Pacientes</Typography>

          <Button variant="contained" onClick={() => setCreateOpen(true)}>
            Novo paciente
          </Button>
        </Stack>

        <TextField
          label="Buscar por nome, CPF ou e-mail"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          fullWidth
        />

        <PatientTable
          patients={filteredPatients}
          onView={(patient) =>
            navigate(paths.patientDetails(String(patient.id)))
          }
          onEdit={(patient) => setEditingPatient(patient)}
          onDelete={(patient) => setDeletingPatient(patient)}
          isDeletingId={
            deleteMutation.isPending ? (deleteMutation.variables ?? null) : null
          }
        />
      </Stack>

      <PatientFormDialog
        open={isCreateOpen}
        onClose={() => setCreateOpen(false)}
        onSaved={(patient) =>
          navigate(paths.patientDetails(String(patient.id)))
        }
      />

      <PatientFormDialog
        open={Boolean(editingPatient)}
        patient={editingPatient}
        onClose={() => setEditingPatient(null)}
      />

      <PatientDeleteDialog
        open={Boolean(deletingPatient)}
        patientName={deletingPatient?.name}
        isPending={deleteMutation.isPending}
        error={deleteError}
        onClose={closeDeleteDialog}
        onConfirm={confirmDelete}
      />
    </>
  );
}
