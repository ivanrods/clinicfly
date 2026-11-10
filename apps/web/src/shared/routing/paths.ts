export const paths = {
  home: '/',
  login: '/login',
  register: '/register',
  dashboard: '/dashboard',
  patients: '/patients',
  patientDetails: (id: string) => `/patients/${id}`,
} as const;

export type AppPath = (typeof paths)[keyof typeof paths];
