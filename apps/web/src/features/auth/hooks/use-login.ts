import { useCallback } from 'react';
import { tokenStorage } from '../../../shared/lib/token-storage';
import { authApi } from '../api/auth-api';
import type { LoginFormValues } from '../schemas/auth-schema';
import type { LoginResponse } from '../types/auth-types';

export function useLogin() {
  const login = useCallback(
    async (values: LoginFormValues): Promise<LoginResponse> => {
      const data = await authApi.login(values);
      tokenStorage.set(data.token);
      return data;
    },
    [],
  );

  return { login };
}
