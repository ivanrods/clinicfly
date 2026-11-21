import { useMutation, useQueryClient } from '@tanstack/react-query';
import { doctorApi } from '../api/doctor-api';
import { doctorKeys } from '../api/doctor-keys';
import type { CreateDoctorPayload, Doctor } from '../types/doctor-types';

export function useCreateDoctor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateDoctorPayload): Promise<Doctor> =>
      doctorApi.create(payload),
    onSuccess: (doctor) => {
      queryClient.setQueryData(doctorKeys.detail(doctor.id), doctor);
      void queryClient.invalidateQueries({ queryKey: doctorKeys.lists() });
    },
  });
}
