import { useMutation, useQueryClient } from '@tanstack/react-query';
import { tokenStorage } from '../../../shared/lib/token-storage';
import { authApi } from '../api/auth-api';
import type { LoginFormValues } from '../schemas/auth-schema';
import type { LoginResponse } from '../types/auth-types';
import { authKeys } from './use-auth';

export function useLogin() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values: LoginFormValues): Promise<LoginResponse> =>
      authApi.login(values),
    onSuccess: (data) => {
      const session = { token: data.token, user: data.user };

      tokenStorage.setSession(session);
      queryClient.setQueryData(authKeys.session, session);
    },
  });

  return {
    login: mutation.mutateAsync,
    isPending: mutation.isPending,
    error: mutation.error,
    reset: mutation.reset,
  };
}
