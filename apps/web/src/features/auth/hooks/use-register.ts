import { useState } from 'react';
import { register } from '../api/auth-api';

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function registerHandler(
    name: string,
    email: string,
    password: string,
  ) {
    setLoading(true);
    setError(null);
    try {
      const data = await register(name, email, password);
      return data;
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }
  return { loading, error, registerHandler };
}
