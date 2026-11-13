import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../features/auth/hooks/use-auth';
import { paths } from './paths';

export function PublicOnlyRoute() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Navigate to={paths.home} replace /> : <Outlet />;
}
