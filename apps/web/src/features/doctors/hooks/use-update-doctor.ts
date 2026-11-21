import { useMutation, useQueryClient } from '@tanstack/react-query';
import { doctorApi } from '../api/doctor-api';
import { doctorKeys } from '../api/doctor-keys';
import type { Doctor, UpdateDoctorPayload } from '../types/doctor-types';

export interface UpdateDoctorVariables {
  id: number;
  payload: UpdateDoctorPayload;
}

export function useUpdateDoctor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: UpdateDoctorVariables): Promise<Doctor> =>
      doctorApi.update(id, payload),
    onSuccess: (doctor) => {
      queryClient.setQueryData(doctorKeys.detail(doctor.id), doctor);
      void queryClient.invalidateQueries({ queryKey: doctorKeys.lists() });
    },
  });
}
