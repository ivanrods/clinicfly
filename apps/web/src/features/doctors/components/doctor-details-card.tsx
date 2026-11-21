import { Box, Button, Chip, Paper, Stack, Typography } from '@mui/material';
import type { Doctor } from '../types/doctor-types';

function formatCrm(value: string): string {
  return value.replace(/^(\d+)(\d{3})$/, '$1.$2');
}

function formatPhone(value: string | null): string {
  if (!value) {
    return '—';
  }

  if (value.length === 11) {
    return value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
  }

  if (value.length === 10) {
    return value.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
  }

  return value;
}

function formatDateTime(value: string): string {
  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? value : date.toLocaleString('pt-BR');
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

interface DoctorDetailsCardProps {
  doctor: Doctor;
  isDeactivating?: boolean;
  onEdit?: () => void;
  onDeactivate?: () => void;
}

export function DoctorDetailsCard({
  doctor,
  isDeactivating = false,
  onEdit,
  onDeactivate,
}: DoctorDetailsCardProps) {
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
        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
          <Typography variant="h5">{doctor.name}</Typography>

          <Chip
            size="small"
            label={doctor.isActive ? 'Ativo' : 'Inativo'}
            color={doctor.isActive ? 'success' : 'default'}
            variant={doctor.isActive ? 'filled' : 'outlined'}
          />
        </Stack>

        <Stack direction="row" spacing={1}>
          {onEdit && (
            <Button
              variant="contained"
              onClick={onEdit}
              disabled={isDeactivating}
            >
              Editar
            </Button>
          )}

          {onDeactivate && doctor.isActive && (
            <Button
              variant="outlined"
              color="error"
              onClick={onDeactivate}
              disabled={isDeactivating}
            >
              {isDeactivating ? 'Desativando...' : 'Desativar'}
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
        <DetailItem label="CRM" value={formatCrm(doctor.crm)} />
        <DetailItem label="Especialidade" value={doctor.specialty} />
        <DetailItem label="Telefone" value={formatPhone(doctor.phone)} />
        <DetailItem label="E-mail" value={doctor.email} />
        <DetailItem
          label="Situação"
          value={doctor.isActive ? 'Ativo' : 'Inativo'}
        />
        <DetailItem
          label="Cadastrado em"
          value={formatDateTime(doctor.createdAt)}
        />
        <DetailItem
          label="Atualizado em"
          value={formatDateTime(doctor.updatedAt)}
        />
      </Box>
    </Paper>
  );
}
