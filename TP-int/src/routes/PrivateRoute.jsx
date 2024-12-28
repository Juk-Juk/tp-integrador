import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/auth/useAuth';
import ROUTES from '../constants/routes';

const PrivateRoute = () => {
    const { token } = useAuth();

    return token ? <Outlet /> : <Navigate to={ROUTES.LOGIN_REG} replace />;
};

export default PrivateRoute;