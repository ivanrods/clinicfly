import { useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { parseApiError } from '../../../shared/api/errors';
import { paths } from '../../../shared/routing/paths';
import { DoctorDeactivateDialog } from '../components/doctor-deactivate-dialog';
import { DoctorFormDialog } from '../components/doctor-form-dialog';
import { DoctorTable } from '../components/doctor-table';
import { useDeactivateDoctor } from '../hooks/use-deactivate-doctor';
import { useDoctors } from '../hooks/use-doctors';
import type { Doctor } from '../types/doctor-types';

export default function DoctorListPage() {
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [includeInactive, setIncludeInactive] = useState(false);
  const [isCreateOpen, setCreateOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [deactivatingDoctor, setDeactivatingDoctor] = useState<Doctor | null>(
    null,
  );

  const {
    data: doctors = [],
    isLoading,
    isError,
    error,
  } = useDoctors(includeInactive);
  const deactivateMutation = useDeactivateDoctor();

  const filteredDoctors = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) {
      return doctors;
    }

    return doctors.filter((doctor) =>
      [doctor.name, doctor.crm, doctor.specialty, doctor.email].some((value) =>
        value.toLowerCase().includes(term),
      ),
    );
  }, [doctors, search]);

  const deactivateError = deactivateMutation.error
    ? parseApiError(deactivateMutation.error).message
    : null;

  function closeDeactivateDialog() {
    if (deactivateMutation.isPending) {
      return;
    }

    deactivateMutation.reset();
    setDeactivatingDoctor(null);
  }

  function confirmDeactivate() {
    if (!deactivatingDoctor) {
      return;
    }

    deactivateMutation.mutate(deactivatingDoctor.id, {
      onSuccess: () => setDeactivatingDoctor(null),
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
          <Typography variant="h4">Médicos</Typography>

          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <FormControlLabel
              control={
                <Switch
                  checked={includeInactive}
                  onChange={(event) => setIncludeInactive(event.target.checked)}
                />
              }
              label="Mostrar inativos"
            />

            <Button variant="contained" onClick={() => setCreateOpen(true)}>
              Novo médico
            </Button>
          </Stack>
        </Stack>

        <TextField
          label="Buscar por nome, CRM, especialidade ou e-mail"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          fullWidth
        />

        <DoctorTable
          doctors={filteredDoctors}
          onView={(doctor) => navigate(paths.doctorDetails(String(doctor.id)))}
          onEdit={(doctor) => setEditingDoctor(doctor)}
          onDeactivate={(doctor) => setDeactivatingDoctor(doctor)}
          isDeactivatingId={
            deactivateMutation.isPending
              ? (deactivateMutation.variables ?? null)
              : null
          }
        />
      </Stack>

      <DoctorFormDialog
        open={isCreateOpen}
        onClose={() => setCreateOpen(false)}
        onSaved={(doctor) => navigate(paths.doctorDetails(String(doctor.id)))}
      />

      <DoctorFormDialog
        open={Boolean(editingDoctor)}
        doctor={editingDoctor}
        onClose={() => setEditingDoctor(null)}
      />

      <DoctorDeactivateDialog
        open={Boolean(deactivatingDoctor)}
        doctorName={deactivatingDoctor?.name}
        isPending={deactivateMutation.isPending}
        error={deactivateError}
        onClose={closeDeactivateDialog}
        onConfirm={confirmDeactivate}
      />
    </>
  );
}
