import { useQuery } from '@tanstack/react-query';
import { doctorApi } from '../api/doctor-api';
import { doctorKeys } from '../api/doctor-keys';

export function useDoctors(includeInactive = false) {
  return useQuery({
    queryKey: doctorKeys.list(includeInactive),
    queryFn: () => doctorApi.getAll(includeInactive),
  });
}
