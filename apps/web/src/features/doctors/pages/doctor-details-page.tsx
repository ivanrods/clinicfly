import { useState } from 'react';
import { Alert, Box, Button, CircularProgress, Stack } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { parseApiError } from '../../../shared/api/errors';
import { paths } from '../../../shared/routing/paths';
import { DoctorDeactivateDialog } from '../components/doctor-deactivate-dialog';
import { DoctorDetailsCard } from '../components/doctor-details-card';
import { DoctorFormDialog } from '../components/doctor-form-dialog';
import { useDeactivateDoctor } from '../hooks/use-deactivate-doctor';
import { useDoctor } from '../hooks/use-doctor';

export default function DoctorDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const doctorId = Number(id);
  const isValidId = Number.isInteger(doctorId) && doctorId > 0;

  const {
    data: doctor,
    isLoading,
    isError,
    error,
  } = useDoctor(isValidId ? doctorId : undefined);

  const [isEditOpen, setEditOpen] = useState(false);
  const [isDeactivateOpen, setDeactivateOpen] = useState(false);

  const deactivateMutation = useDeactivateDoctor();

  const deactivateError = deactivateMutation.error
    ? parseApiError(deactivateMutation.error).message
    : null;

  function closeDeactivateDialog() {
    if (deactivateMutation.isPending) {
      return;
    }

    deactivateMutation.reset();
    setDeactivateOpen(false);
  }

  function confirmDeactivate() {
    if (!doctor) {
      return;
    }

    deactivateMutation.mutate(doctor.id, {
      onSuccess: () => {
        setDeactivateOpen(false);
        navigate(paths.doctors, { replace: true });
      },
    });
  }

  if (!isValidId) {
    return <Alert severity="error">Médico inválido.</Alert>;
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
          onClick={() => navigate(paths.doctors)}
        >
          Voltar para médicos
        </Button>
      </Stack>
    );
  }

  if (!doctor) {
    return (
      <Stack spacing={2} sx={{ maxWidth: 560 }}>
        <Alert severity="warning">Médico não encontrado.</Alert>
        <Button
          sx={{ alignSelf: 'flex-start' }}
          onClick={() => navigate(paths.doctors)}
        >
          Voltar para médicos
        </Button>
      </Stack>
    );
  }

  return (
    <>
      <Stack spacing={2}>
        <Button
          sx={{ alignSelf: 'flex-start' }}
          onClick={() => navigate(paths.doctors)}
        >
          Voltar
        </Button>

        <DoctorDetailsCard
          doctor={doctor}
          isDeactivating={deactivateMutation.isPending}
          onEdit={() => setEditOpen(true)}
          onDeactivate={() => setDeactivateOpen(true)}
        />
      </Stack>

      <DoctorFormDialog
        open={isEditOpen}
        doctor={doctor}
        onClose={() => setEditOpen(false)}
      />

      <DoctorDeactivateDialog
        open={isDeactivateOpen}
        doctorName={doctor.name}
        isPending={deactivateMutation.isPending}
        error={deactivateError}
        onClose={closeDeactivateDialog}
        onConfirm={confirmDeactivate}
      />
    </>
  );
}
