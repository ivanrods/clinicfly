import { useQuery } from '@tanstack/react-query';
import { patientApi } from '../api/patient-api';
import { patientKeys } from '../api/patient-keys';

export function usePatients() {
  return useQuery({
    queryKey: patientKeys.lists(),
    queryFn: () => patientApi.getAll(),
  });
}
