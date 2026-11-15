import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import type { Gender, Patient } from '../types/patient-types';

const genderLabels: Record<Gender, string> = {
  male: 'Masculino',
  female: 'Feminino',
  other: 'Outro',
};

function formatDate(value: string): string {
  const [year, month, day] = value.split('-');

  return year && month && day ? `${day}/${month}/${year}` : value;
}

function formatDateTime(value: string): string {
  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? value : date.toLocaleString('pt-BR');
}

function formatCpf(value: string): string {
  return value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
}

interface DetailItemProps {
  label: string;
  value: string;
}

function DetailItem({ label, value }: DetailItemProps) {
  return (
    <Box>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body1">{value}</Typography>
    </Box>
  );
}

interface PatientDetailsCardProps {
  patient: Patient;
  isDeleting?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function PatientDetailsCard({
  patient,
  isDeleting = false,
  onEdit,
  onDelete,
}: PatientDetailsCardProps) {
  return (
    <Paper variant="outlined" sx={{ p: 3 }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{
          mb: 3,
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
        }}
      >
        <Typography variant="h5">{patient.name}</Typography>

        <Stack direction="row" spacing={1}>
          {onEdit && (
            <Button variant="contained" onClick={onEdit} disabled={isDeleting}>
              Editar
            </Button>
          )}

          {onDelete && (
            <Button
              variant="outlined"
              color="error"
              onClick={onDelete}
              disabled={isDeleting}
            >
              {isDeleting ? 'Excluindo...' : 'Excluir'}
            </Button>
          )}
        </Stack>
      </Stack>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: 2,
        }}
      >
        <DetailItem label="CPF" value={formatCpf(patient.cpf)} />
        <DetailItem
          label="Data de nascimento"
          value={formatDate(patient.birthDate)}
        />
        <DetailItem label="Gênero" value={genderLabels[patient.gender]} />
        <DetailItem label="Telefone" value={patient.phone ?? 'Não informado'} />
        <DetailItem label="E-mail" value={patient.email} />
        <DetailItem
          label="Cadastrado em"
          value={formatDateTime(patient.createdAt)}
        />
        <DetailItem
          label="Atualizado em"
          value={formatDateTime(patient.updatedAt)}
        />
      </Box>
    </Paper>
  );
}
