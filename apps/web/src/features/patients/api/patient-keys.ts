export const patientKeys = {
  all: ['patients'] as const,
  lists: () => [...patientKeys.all, 'list'] as const,
  details: () => [...patientKeys.all, 'detail'] as const,
  detail: (id: number) => [...patientKeys.details(), id] as const,
};
