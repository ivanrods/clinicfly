import {
  Chip,
  CircularProgress,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material';
import BlockOutlined from '@mui/icons-material/BlockOutlined';
import EditOutlined from '@mui/icons-material/EditOutlined';
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined';
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

interface DoctorTableProps {
  doctors: Doctor[];
  onView?: (doctor: Doctor) => void;
  onEdit?: (doctor: Doctor) => void;
  onDeactivate?: (doctor: Doctor) => void;
  isDeactivatingId?: number | null;
}

export function DoctorTable({
  doctors,
  onView,
  onEdit,
  onDeactivate,
  isDeactivatingId = null,
}: DoctorTableProps) {
  return (
    <TableContainer component={Paper} variant="outlined">
      <Table sx={{ minWidth: 980 }}>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>CRM</TableCell>
            <TableCell>Especialidade</TableCell>
            <TableCell>Telefone</TableCell>
            <TableCell>E-mail</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Ações</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {doctors.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} align="center">
                Nenhum médico encontrado.
              </TableCell>
            </TableRow>
          )}

          {doctors.map((doctor) => (
            <TableRow key={doctor.id} hover>
              <TableCell>{doctor.name}</TableCell>
              <TableCell>{formatCrm(doctor.crm)}</TableCell>
              <TableCell>{doctor.specialty}</TableCell>
              <TableCell>{formatPhone(doctor.phone)}</TableCell>
              <TableCell>{doctor.email}</TableCell>
              <TableCell>
                <Chip
                  size="small"
                  label={doctor.isActive ? 'Ativo' : 'Inativo'}
                  color={doctor.isActive ? 'success' : 'default'}
                  variant={doctor.isActive ? 'filled' : 'outlined'}
                />
              </TableCell>
              <TableCell align="right">
                <Stack
                  direction="row"
                  spacing={0.5}
                  sx={{ justifyContent: 'flex-end' }}
                >
                  {onView && (
                    <Tooltip title="Ver detalhes">
                      <IconButton
                        aria-label={`Ver detalhes de ${doctor.name}`}
                        onClick={() => onView(doctor)}
                      >
                        <VisibilityOutlined fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}

                  {onEdit && (
                    <Tooltip title="Editar">
                      <IconButton
                        aria-label={`Editar ${doctor.name}`}
                        onClick={() => onEdit(doctor)}
                      >
                        <EditOutlined fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}

                  {onDeactivate && doctor.isActive && (
                    <Tooltip title="Desativar">
                      <span>
                        <IconButton
                          aria-label={`Desativar ${doctor.name}`}
                          color="error"
                          disabled={isDeactivatingId === doctor.id}
                          onClick={() => onDeactivate(doctor)}
                        >
                          {isDeactivatingId === doctor.id ? (
                            <CircularProgress size={18} />
                          ) : (
                            <BlockOutlined fontSize="small" />
                          )}
                        </IconButton>
                      </span>
                    </Tooltip>
                  )}
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
