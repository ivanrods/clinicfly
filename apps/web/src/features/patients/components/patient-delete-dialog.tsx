import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

interface PatientDeleteDialogProps {
  open: boolean;
  patientName?: string;
  isPending?: boolean;
  error?: string | null;
  onClose: () => void;
  onConfirm: () => void;
}

export function PatientDeleteDialog({
  open,
  patientName,
  isPending = false,
  error = null,
  onClose,
  onConfirm,
}: PatientDeleteDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={isPending ? undefined : onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>Excluir paciente</DialogTitle>

      <DialogContent>
        <DialogContentText>
          Tem certeza que deseja excluir{' '}
          {patientName ? `o paciente ${patientName}` : 'este paciente'}? Esta
          ação não pode ser desfeita.
        </DialogContentText>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={isPending}>
          Cancelar
        </Button>
        <Button
          onClick={onConfirm}
          color="error"
          variant="contained"
          disabled={isPending}
        >
          {isPending ? 'Excluindo...' : 'Excluir'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
