import { AuthContext } from '@/context/AuthContext';
import React, { useContext } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoutes = () => {
    const location = useLocation();
    const { isAuthenticated, loading } = useContext(AuthContext);

    if (loading) {
        return <div>Loading...</div>; // yoki spinner
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
}

export default ProtectedRoutes;
