export const paths = {
  home: '/',
  login: '/login',
  register: '/register',
  dashboard: '/dashboard',
  patients: '/patients',
  patientDetails: (id: string | number) => `/patients/${id}`,
  doctors: '/doctors',
  doctorDetails: (id: string | number) => `/doctors/${id}`,
} as const;

export type AppPath = (typeof paths)[keyof typeof paths];
