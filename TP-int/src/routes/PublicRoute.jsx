import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/auth/useAuth';
import ROUTES from '../constants/routes';

const PublicRoute = () => {
  const { token } = useAuth();

  return token ? <Navigate to={ROUTES.RECIPES} /> : <Outlet />;
};

export default PublicRoute;