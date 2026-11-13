import { useQuery } from '@tanstack/react-query';
import {
  tokenStorage,
  type AuthSession,
} from '../../../shared/lib/token-storage';

export const authKeys = {
  session: ['auth', 'session'] as const,
};

export function useAuth() {
  const { data: session = null, isLoading } = useQuery<AuthSession | null>({
    queryKey: authKeys.session,
    queryFn: () => tokenStorage.getSession(),
    initialData: () => tokenStorage.getSession(),
    staleTime: Infinity,
    gcTime: Infinity,
  });

  return {
    session,
    user: session?.user ?? null,
    isAuthenticated: session !== null,
    isLoading,
  };
}
