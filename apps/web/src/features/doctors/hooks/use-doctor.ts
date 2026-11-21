import { useQuery } from '@tanstack/react-query';
import { doctorApi } from '../api/doctor-api';
import { doctorKeys } from '../api/doctor-keys';

export function useDoctor(id: number | undefined) {
  const doctorId = id ?? 0;

  return useQuery({
    queryKey: doctorKeys.detail(doctorId),
    queryFn: () => doctorApi.getById(doctorId),
    enabled: doctorId > 0,
  });
}
