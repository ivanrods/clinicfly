import { useState } from 'react';
import { login } from '../api/auth-api';

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loginHandler(email: string, password: string) {
    setLoading(true);
    setError(null);
    try {
      const data = await login(email, password);
      localStorage.setItem('token', data.token);
      return data;
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }
  return { loading, error, loginHandler };
}
