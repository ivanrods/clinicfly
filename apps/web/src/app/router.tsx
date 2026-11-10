import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from './layouts/app-layout';
import { AuthLayout } from './layouts/auth-layout';
import { RootLayout } from './layouts/root-layout';
import { ProtectedRoute } from '../shared/routing/protected-route';
import { PublicOnlyRoute } from '../shared/routing/public-only-route';
import { RouteErrorPage } from '../shared/routing/route-error-page';
import { NotFoundPage } from '../pages/not-found-page';
import HomePage from '../pages/home-page';

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <RouteErrorPage />,
    children: [
      // Rotas públicas (mas bloqueadas para quem já está logado)
      {
        element: <PublicOnlyRoute />,
        children: [
          {
            element: <AuthLayout />,
            children: [
              {
                path: 'login',
                lazy: () =>
                  import('../features/auth/pages/login-page').then((m) => ({
                    Component: m.default,
                  })),
              },
              {
                path: 'register',
                lazy: () =>
                  import('../features/auth/pages/register-page').then((m) => ({
                    Component: m.default,
                  })),
              },
            ],
          },
        ],
      },

      // Rotas privadas
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <AppLayout />,
            children: [
              { index: true, element: <HomePage /> },
              // ...rotas de features entram aqui
            ],
          },
        ],
      },

      // 404 real, não redirect silencioso
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
