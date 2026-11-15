import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patientApi } from '../api/patient-api';
import { patientKeys } from '../api/patient-keys';
import type { Patient, UpdatePatientPayload } from '../types/patient-types';

export interface UpdatePatientVariables {
  id: number;
  payload: UpdatePatientPayload;
}

export function useUpdatePatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: UpdatePatientVariables): Promise<Patient> =>
      patientApi.update(id, payload),
    onSuccess: (patient) => {
      queryClient.setQueryData(patientKeys.detail(patient.id), patient);
      void queryClient.invalidateQueries({ queryKey: patientKeys.lists() });
    },
  });
}
