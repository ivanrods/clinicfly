import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patientApi } from '../api/patient-api';
import { patientKeys } from '../api/patient-keys';

export function useDeletePatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number): Promise<void> => patientApi.remove(id),
    onSuccess: (_data, id) => {
      queryClient.removeQueries({ queryKey: patientKeys.detail(id) });
      void queryClient.invalidateQueries({ queryKey: patientKeys.lists() });
    },
  });
}
