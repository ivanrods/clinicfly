import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { tokenStorage } from '../lib/token-storage';
import { paths } from './paths';

export function ProtectedRoute() {
  const location = useLocation();
  const token = tokenStorage.get();

  if (!token) {
    return <Navigate to={paths.login} replace state={{ from: location }} />;
  }

  return <Outlet />;
}
