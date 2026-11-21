import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

interface DoctorDeactivateDialogProps {
  open: boolean;
  doctorName?: string;
  isPending?: boolean;
  error?: string | null;
  onClose: () => void;
  onConfirm: () => void;
}

export function DoctorDeactivateDialog({
  open,
  doctorName,
  isPending = false,
  error = null,
  onClose,
  onConfirm,
}: DoctorDeactivateDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={isPending ? undefined : onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>Desativar médico</DialogTitle>

      <DialogContent>
        <DialogContentText>
          Tem certeza que deseja desativar{' '}
          {doctorName ? `o médico ${doctorName}` : 'este médico'}? Ele não
          aparecerá na listagem padrão, mas poderá ser reativado na edição.
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
          {isPending ? 'Desativando...' : 'Desativar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
