import { Link } from 'react-router-dom';
import { paths } from '../shared/routing/paths';

export function NotFoundPage() {
  return (
    <div>
      <h1>Página não encontrada</h1>
      <Link to={paths.home}>Voltar para o início</Link>
    </div>
  );
}
