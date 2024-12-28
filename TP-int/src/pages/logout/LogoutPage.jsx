import { useAuth } from "../../hooks/auth/useAuth";

const LogoutPage = () => {
    const { logout } = useAuth();
    
    logout();

    return null;
};

export default LogoutPage;