import { useMutation, useQueryClient } from '@tanstack/react-query';
import { doctorApi } from '../api/doctor-api';
import { doctorKeys } from '../api/doctor-keys';
import type { Doctor } from '../types/doctor-types';

export function useDeactivateDoctor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number): Promise<void> => doctorApi.deactivate(id),
    onSuccess: (_data, id) => {
      queryClient.setQueryData<Doctor>(doctorKeys.detail(id), (current) =>
        current ? { ...current, isActive: false } : current,
      );

      void queryClient.invalidateQueries({ queryKey: doctorKeys.lists() });
      void queryClient.invalidateQueries({ queryKey: doctorKeys.detail(id) });
    },
  });
}
