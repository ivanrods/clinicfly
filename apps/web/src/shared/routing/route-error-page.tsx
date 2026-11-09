import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

export function RouteErrorPage() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        {error.status} — {error.statusText}
      </div>
    );
  }

  return <div>Algo deu errado. Tente novamente.</div>;
}
