import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/auth/useAuth';
import ROUTES from '../constants/routes';

const RoleRoute = ({ requiredRole }) => {
    const { token, role } = useAuth();

    if (!token) {
        return <Navigate to={ROUTES.LOGIN_REG} />;
    }

    if (role !== requiredRole) {
        return <Navigate to={ROUTES.UNAUTHORIZED} />;
    }

    return <Outlet />;
};

export default RoleRoute;