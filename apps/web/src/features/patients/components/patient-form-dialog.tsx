import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useCreatePatient } from '../hooks/use-create-patient';
import { useUpdatePatient } from '../hooks/use-update-patient';
import type { PatientFormValues } from '../schemas/patient-schema';
import type { Patient } from '../types/patient-types';
import { PatientForm } from './patient-form';

interface PatientFormDialogProps {
  open: boolean;
  patient?: Patient | null;
  onClose: () => void;
  onSaved?: (patient: Patient) => void;
}

function toFormValues(patient?: Patient | null): Partial<PatientFormValues> {
  if (!patient) {
    return {};
  }

  return {
    name: patient.name,
    cpf: patient.cpf,
    birthDate: patient.birthDate,
    gender: patient.gender,
    phone: patient.phone ?? '',
    email: patient.email,
  };
}

export function PatientFormDialog({
  open,
  patient = null,
  onClose,
  onSaved,
}: PatientFormDialogProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const createMutation = useCreatePatient();
  const updateMutation = useUpdatePatient();

  const isEditing = Boolean(patient);
  const isPending = createMutation.isPending || updateMutation.isPending;

  async function handleSubmit(values: PatientFormValues) {
    const saved = patient
      ? await updateMutation.mutateAsync({
          id: patient.id,
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
      <DialogTitle>
        {isEditing ? 'Editar paciente' : 'Novo paciente'}
      </DialogTitle>

      <DialogContent dividers>
        <Box sx={{ pt: 1 }}>
          <PatientForm
            key={patient?.id ?? 'new'}
            defaultValues={toFormValues(patient)}
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
