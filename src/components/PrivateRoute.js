import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = () => {
    const { authData } = useAuth();
    return authData.token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;