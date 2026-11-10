import { Navigate, Outlet } from 'react-router-dom';
import { tokenStorage } from '../lib/token-storage';
import { paths } from './paths';

export function PublicOnlyRoute() {
  const token = tokenStorage.get();

  return token ? <Navigate to={paths.home} replace /> : <Outlet />;
}
