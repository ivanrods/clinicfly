import { zodResolver } from '@hookform/resolvers/zod';
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { parseApiError } from '../../../shared/api/errors';
import {
  createPatientSchema,
  type PatientFormValues,
} from '../schemas/patient-schema';

interface PatientFormProps {
  defaultValues?: Partial<PatientFormValues>;
  submitLabel?: string;
  isSubmitting?: boolean;
  onSubmit: (values: PatientFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

export function PatientForm({
  defaultValues,
  submitLabel = 'Salvar',
  isSubmitting = false,
  onSubmit,
  onCancel,
}: PatientFormProps) {
  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting: isFormSubmitting },
  } = useForm<PatientFormValues>({
    resolver: zodResolver(createPatientSchema),
    defaultValues: {
      name: '',
      cpf: '',
      birthDate: '',
      phone: '',
      email: '',
      ...defaultValues,
    },
  });

  const isBusy = isSubmitting || isFormSubmitting;

  async function handleFormSubmit(values: PatientFormValues) {
    try {
      await onSubmit(values);
    } catch (error) {
      const { message, fieldErrors } = parseApiError(error);
      const fieldNames = Object.keys(createPatientSchema.shape);

      for (const [field, fieldMessage] of Object.entries(fieldErrors)) {
        if (fieldNames.includes(field)) {
          setError(field as keyof PatientFormValues, {
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
          label="CPF"
          inputMode="numeric"
          placeholder="000.000.000-00"
          fullWidth
          error={Boolean(errors.cpf)}
          helperText={errors.cpf?.message}
          {...register('cpf')}
        />

        <TextField
          label="Data de nascimento"
          type="date"
          fullWidth
          slotProps={{ inputLabel: { shrink: true } }}
          error={Boolean(errors.birthDate)}
          helperText={errors.birthDate?.message}
          {...register('birthDate')}
        />

        <Controller
          name="gender"
          control={control}
          render={({ field, fieldState }) => (
            <FormControl fullWidth error={Boolean(fieldState.error)}>
              <InputLabel id="patient-gender-label">Gênero</InputLabel>
              <Select
                {...field}
                labelId="patient-gender-label"
                label="Gênero"
                value={field.value ?? ''}
              >
                <MenuItem value="" disabled>
                  Selecione
                </MenuItem>
                <MenuItem value="male">Masculino</MenuItem>
                <MenuItem value="female">Feminino</MenuItem>
                <MenuItem value="other">Outro</MenuItem>
              </Select>
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            </FormControl>
          )}
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
