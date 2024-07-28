import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children, isAdminRoute }) {
    const email = localStorage.getItem('email');
    const isAdmin = localStorage.getItem('is_admin') === '1';

    if (!email) {
        // L'utilisateur n'est pas connecté
        return <Navigate to="/login" />;
    }

    if (isAdminRoute && !isAdmin) {
        // Rediriger les utilisateurs non-admins qui essaient d'accéder à une route admin
        return <Navigate to="/dashboard" />;
    }

    if (!isAdminRoute && isAdmin) {
        // Rediriger les admins qui essaient d'accéder à une route utilisateur
        return <Navigate to="/admin/dashboard" />;
    }

    // L'utilisateur est autorisé à accéder à cette route
    return children;
}

export default PrivateRoute;
