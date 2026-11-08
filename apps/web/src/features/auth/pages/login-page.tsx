import { zodResolver } from '@hookform/resolvers/zod';
import {
  Alert,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { getApiErrorMessage } from '../../../shared/api/errors';
import { useLogin } from '../hooks/use-login';
import { loginSchema, type LoginFormValues } from '../schemas/auth-schema';

interface LocationState {
  from?: { pathname?: string };
  registered?: boolean;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state ?? {}) as LocationState;
  const { login } = useLogin();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  async function onSubmit(values: LoginFormValues) {
    try {
      await login(values);
      navigate(state.from?.pathname ?? '/', { replace: true });
    } catch (error) {
      setError('root', { message: getApiErrorMessage(error) });
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ maxWidth: 400, mx: 'auto', mt: 8, p: 3 }}
    >
      <Typography variant="h4" gutterBottom>
        Faça seu login
      </Typography>

      {state.registered && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Cadastro realizado com sucesso. Faça login.
        </Alert>
      )}

      {errors.root?.message && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errors.root.message}
        </Alert>
      )}

      <Stack spacing={2}>
        <TextField
          label="E-mail"
          type="email"
          autoComplete="email"
          fullWidth
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
          {...register('email')}
        />

        <TextField
          label="Senha"
          type="password"
          autoComplete="current-password"
          fullWidth
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
          {...register('password')}
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Entrando...' : 'Entrar'}
        </Button>

        <Button component={RouterLink} to="/register" variant="text">
          Criar conta
        </Button>
      </Stack>
    </Box>
  );
}
