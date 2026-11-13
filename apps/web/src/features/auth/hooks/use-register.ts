import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/auth-api';
import type { RegisterFormValues } from '../schemas/auth-schema';
import type { RegisterResponse } from '../types/auth-types';

export function useRegister() {
  const mutation = useMutation({
    mutationFn: (values: RegisterFormValues): Promise<RegisterResponse> =>
      authApi.register({
        name: values.name,
        email: values.email,
        password: values.password,
      }),
  });

  return {
    registerAccount: mutation.mutateAsync,
    isPending: mutation.isPending,
    error: mutation.error,
    reset: mutation.reset,
  };
}
