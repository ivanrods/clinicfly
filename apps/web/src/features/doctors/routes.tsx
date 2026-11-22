import type { RouteObject } from 'react-router-dom';

export const doctorRoutes: RouteObject[] = [
  {
    path: 'doctors',
    lazy: () =>
      import('./pages/doctor-list-page').then((m) => ({
        Component: m.default,
      })),
  },
  {
    path: 'doctors/:id',
    lazy: () =>
      import('./pages/doctor-details-page').then((m) => ({
        Component: m.default,
      })),
  },
];
