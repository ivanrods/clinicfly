import {
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
import DeleteOutlined from '@mui/icons-material/DeleteOutlined';
import EditOutlined from '@mui/icons-material/EditOutlined';
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined';
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

function formatCpf(value: string): string {
  return value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
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

interface PatientTableProps {
  patients: Patient[];
  onView?: (patient: Patient) => void;
  onEdit?: (patient: Patient) => void;
  onDelete?: (patient: Patient) => void;
  isDeletingId?: number | null;
}

export function PatientTable({
  patients,
  onView,
  onEdit,
  onDelete,
  isDeletingId = null,
}: PatientTableProps) {
  return (
    <TableContainer component={Paper} variant="outlined">
      <Table sx={{ minWidth: 860 }}>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>CPF</TableCell>
            <TableCell>Nascimento</TableCell>
            <TableCell>Gênero</TableCell>
            <TableCell>Telefone</TableCell>
            <TableCell>E-mail</TableCell>
            <TableCell align="right">Ações</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {patients.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} align="center">
                Nenhum paciente encontrado.
              </TableCell>
            </TableRow>
          )}

          {patients.map((patient) => (
            <TableRow key={patient.id} hover>
              <TableCell>{patient.name}</TableCell>
              <TableCell>{formatCpf(patient.cpf)}</TableCell>
              <TableCell>{formatDate(patient.birthDate)}</TableCell>
              <TableCell>{genderLabels[patient.gender]}</TableCell>
              <TableCell>{formatPhone(patient.phone)}</TableCell>
              <TableCell>{patient.email}</TableCell>
              <TableCell align="right">
                <Stack
                  direction="row"
                  spacing={0.5}
                  sx={{ justifyContent: 'flex-end' }}
                >
                  {onView && (
                    <Tooltip title="Ver detalhes">
                      <IconButton
                        aria-label={`Ver detalhes de ${patient.name}`}
                        onClick={() => onView(patient)}
                      >
                        <VisibilityOutlined fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}

                  {onEdit && (
                    <Tooltip title="Editar">
                      <IconButton
                        aria-label={`Editar ${patient.name}`}
                        onClick={() => onEdit(patient)}
                      >
                        <EditOutlined fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}

                  {onDelete && (
                    <Tooltip title="Excluir">
                      <span>
                        <IconButton
                          aria-label={`Excluir ${patient.name}`}
                          color="error"
                          disabled={isDeletingId === patient.id}
                          onClick={() => onDelete(patient)}
                        >
                          {isDeletingId === patient.id ? (
                            <CircularProgress size={18} />
                          ) : (
                            <DeleteOutlined fontSize="small" />
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
