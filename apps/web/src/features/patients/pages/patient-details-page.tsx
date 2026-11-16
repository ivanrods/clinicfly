import { useState } from 'react';
import { Alert, Box, Button, CircularProgress, Stack } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { parseApiError } from '../../../shared/api/errors';
import { paths } from '../../../shared/routing/paths';
import { PatientDeleteDialog } from '../components/patient-delete-dialog';
import { PatientDetailsCard } from '../components/patient-details-card';
import { PatientFormDialog } from '../components/patient-form-dialog';
import { useDeletePatient } from '../hooks/use-delete-patient';
import { usePatient } from '../hooks/use-patient';

export default function PatientDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const patientId = Number(id);
  const isValidId = Number.isInteger(patientId) && patientId > 0;

  const {
    data: patient,
    isLoading,
    isError,
    error,
  } = usePatient(isValidId ? patientId : undefined);

  const [isEditOpen, setEditOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);

  const deleteMutation = useDeletePatient();

  const deleteError = deleteMutation.error
    ? parseApiError(deleteMutation.error).message
    : null;

  function closeDeleteDialog() {
    if (deleteMutation.isPending) {
      return;
    }

    deleteMutation.reset();
    setDeleteOpen(false);
  }

  function confirmDelete() {
    if (!patient) {
      return;
    }

    deleteMutation.mutate(patient.id, {
      onSuccess: () => {
        setDeleteOpen(false);
        navigate(paths.patients, { replace: true });
      },
    });
  }

  if (!isValidId) {
    return <Alert severity="error">Paciente inválido.</Alert>;
  }

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Stack spacing={2} sx={{ maxWidth: 560 }}>
        <Alert severity="error">{parseApiError(error).message}</Alert>
        <Button
          sx={{ alignSelf: 'flex-start' }}
          onClick={() => navigate(paths.patients)}
        >
          Voltar para pacientes
        </Button>
      </Stack>
    );
  }

  if (!patient) {
    return (
      <Stack spacing={2} sx={{ maxWidth: 560 }}>
        <Alert severity="warning">Paciente não encontrado.</Alert>
        <Button
          sx={{ alignSelf: 'flex-start' }}
          onClick={() => navigate(paths.patients)}
        >
          Voltar para pacientes
        </Button>
      </Stack>
    );
  }

  return (
    <>
      <Stack spacing={2}>
        <Button
          sx={{ alignSelf: 'flex-start' }}
          onClick={() => navigate(paths.patients)}
        >
          Voltar
        </Button>

        <PatientDetailsCard
          patient={patient}
          isDeleting={deleteMutation.isPending}
          onEdit={() => setEditOpen(true)}
          onDelete={() => setDeleteOpen(true)}
        />
      </Stack>

      <PatientFormDialog
        open={isEditOpen}
        patient={patient}
        onClose={() => setEditOpen(false)}
      />

      <PatientDeleteDialog
        open={isDeleteOpen}
        patientName={patient.name}
        isPending={deleteMutation.isPending}
        error={deleteError}
        onClose={closeDeleteDialog}
        onConfirm={confirmDelete}
      />
    </>
  );
}
