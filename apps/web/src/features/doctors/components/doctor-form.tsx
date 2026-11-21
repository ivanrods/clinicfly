import { zodResolver } from '@hookform/resolvers/zod';
import {
  Alert,
  Box,
  Button,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { parseApiError } from '../../../shared/api/errors';
import {
  doctorFormSchema,
  type DoctorFormValues,
} from '../schemas/doctor-schema';

interface DoctorFormProps {
  defaultValues?: Partial<DoctorFormValues>;
  showActiveToggle?: boolean;
  submitLabel?: string;
  isSubmitting?: boolean;
  onSubmit: (values: DoctorFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

export function DoctorForm({
  defaultValues,
  showActiveToggle = false,
  submitLabel = 'Salvar',
  isSubmitting = false,
  onSubmit,
  onCancel,
}: DoctorFormProps) {
  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting: isFormSubmitting },
  } = useForm<DoctorFormValues>({
    resolver: zodResolver(doctorFormSchema),
    defaultValues: {
      name: '',
      crm: '',
      specialty: '',
      phone: '',
      email: '',
      isActive: true,
      ...defaultValues,
    },
  });

  const isBusy = isSubmitting || isFormSubmitting;

  async function handleFormSubmit(values: DoctorFormValues) {
    try {
      await onSubmit(values);
    } catch (error) {
      const { message, fieldErrors } = parseApiError(error);
      const fieldNames = Object.keys(doctorFormSchema.shape);

      for (const [field, fieldMessage] of Object.entries(fieldErrors)) {
        if (fieldNames.includes(field)) {
          setError(field as keyof DoctorFormValues, {
            message: fieldMessage,
          });
        }
      }

      if (Object.keys(fieldErrors).length === 0) {
        setError('root', { message });
      }
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleFormSubmit)}
      noValidate
      sx={{ maxWidth: 560 }}
    >
      <Stack spacing={2}>
        {errors.root?.message && (
          <Alert severity="error">{errors.root.message}</Alert>
        )}

        <TextField
          label="Nome"
          autoComplete="name"
          fullWidth
          error={Boolean(errors.name)}
          helperText={errors.name?.message}
          {...register('name')}
        />

        <TextField
          label="CRM"
          inputMode="numeric"
          placeholder="0000000"
          fullWidth
          error={Boolean(errors.crm)}
          helperText={errors.crm?.message}
          {...register('crm')}
        />

        <TextField
          label="Especialidade"
          fullWidth
          error={Boolean(errors.specialty)}
          helperText={errors.specialty?.message}
          {...register('specialty')}
        />

        <TextField
          label="Telefone"
          type="tel"
          inputMode="tel"
          placeholder="(11) 99999-9999"
          fullWidth
          error={Boolean(errors.phone)}
          helperText={errors.phone?.message}
          {...register('phone')}
        />

        <TextField
          label="E-mail"
          type="email"
          autoComplete="email"
          fullWidth
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
          {...register('email')}
        />

        {showActiveToggle && (
          <Controller
            name="isActive"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Switch
                    checked={field.value ?? true}
                    onChange={(_event, checked) => field.onChange(checked)}
                    slotProps={{ input: { ref: field.ref } }}
                  />
                }
                label="Médico ativo"
              />
            )}
          />
        )}

        <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end' }}>
          {onCancel && (
            <Button onClick={onCancel} disabled={isBusy}>
              Cancelar
            </Button>
          )}

          <Button type="submit" variant="contained" disabled={isBusy}>
            {isBusy ? 'Salvando...' : submitLabel}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
