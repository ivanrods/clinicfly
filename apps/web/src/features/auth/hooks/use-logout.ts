import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { tokenStorage } from '../../../shared/lib/token-storage';
import { paths } from '../../../shared/routing/paths';
import { authKeys } from './use-auth';

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const logout = useCallback(() => {
    tokenStorage.clear();
    queryClient.clear();
    queryClient.setQueryData(authKeys.session, null);
    navigate(paths.login, { replace: true });
  }, [navigate, queryClient]);

  return { logout };
}
