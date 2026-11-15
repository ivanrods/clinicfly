import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patientApi } from '../api/patient-api';
import { patientKeys } from '../api/patient-keys';
import type { CreatePatientPayload, Patient } from '../types/patient-types';

export function useCreatePatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePatientPayload): Promise<Patient> =>
      patientApi.create(payload),
    onSuccess: (patient) => {
      queryClient.setQueryData(patientKeys.detail(patient.id), patient);
      void queryClient.invalidateQueries({ queryKey: patientKeys.lists() });
    },
  });
}
