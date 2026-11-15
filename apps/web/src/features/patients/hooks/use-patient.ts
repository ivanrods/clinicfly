import { useQuery } from '@tanstack/react-query';
import { patientApi } from '../api/patient-api';
import { patientKeys } from '../api/patient-keys';

export function usePatient(id: number | undefined) {
  const patientId = id ?? 0;

  return useQuery({
    queryKey: patientKeys.detail(patientId),
    queryFn: () => patientApi.getById(patientId),
    enabled: patientId > 0,
  });
}
