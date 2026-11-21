import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useCreateDoctor } from '../hooks/use-create-doctor';
import { useUpdateDoctor } from '../hooks/use-update-doctor';
import type { DoctorFormValues } from '../schemas/doctor-schema';
import type { Doctor } from '../types/doctor-types';
import { DoctorForm } from './doctor-form';

interface DoctorFormDialogProps {
  open: boolean;
  doctor?: Doctor | null;
  onClose: () => void;
  onSaved?: (doctor: Doctor) => void;
}

function toFormValues(doctor?: Doctor | null): Partial<DoctorFormValues> {
  if (!doctor) {
    return {};
  }

  return {
    name: doctor.name,
    crm: doctor.crm,
    specialty: doctor.specialty,
    phone: doctor.phone ?? '',
    email: doctor.email,
    isActive: doctor.isActive,
  };
}

export function DoctorFormDialog({
  open,
  doctor = null,
  onClose,
  onSaved,
}: DoctorFormDialogProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const createMutation = useCreateDoctor();
  const updateMutation = useUpdateDoctor();

  const isEditing = Boolean(doctor);
  const isPending = createMutation.isPending || updateMutation.isPending;

  async function handleSubmit(values: DoctorFormValues) {
    const saved = doctor
      ? await updateMutation.mutateAsync({
          id: doctor.id,
          payload: values,
        })
      : await createMutation.mutateAsync(values);

    onSaved?.(saved);
    onClose();
  }

  return (
    <Dialog
      open={open}
      onClose={isPending ? undefined : onClose}
      maxWidth="sm"
      fullWidth
      fullScreen={fullScreen}
    >
      <DialogTitle>{isEditing ? 'Editar médico' : 'Novo médico'}</DialogTitle>

      <DialogContent dividers>
        <Box sx={{ pt: 1 }}>
          <DoctorForm
            key={doctor?.id ?? 'new'}
            defaultValues={toFormValues(doctor)}
            showActiveToggle={isEditing}
            submitLabel={isEditing ? 'Salvar' : 'Cadastrar'}
            isSubmitting={isPending}
            onSubmit={handleSubmit}
            onCancel={onClose}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
}
