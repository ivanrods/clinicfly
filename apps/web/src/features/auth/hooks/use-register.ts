import { useCallback } from 'react';
import { authApi } from '../api/auth-api';
import type { RegisterFormValues } from '../schemas/auth-schema';
import type { RegisterResponse } from '../types/auth-types';

export function useRegister() {
  const registerAccount = useCallback(
    (values: RegisterFormValues): Promise<RegisterResponse> =>
      authApi.register({
        name: values.name,
        email: values.email,
        password: values.password,
      }),
    [],
  );

  return { registerAccount };
}
