export const doctorKeys = {
  all: ['doctors'] as const,
  lists: () => [...doctorKeys.all, 'list'] as const,
  list: (includeInactive: boolean) =>
    [...doctorKeys.lists(), { includeInactive }] as const,
  details: () => [...doctorKeys.all, 'detail'] as const,
  detail: (id: number) => [...doctorKeys.details(), id] as const,
};
