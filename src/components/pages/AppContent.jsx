import React from 'react';
import { Route, Routes, Link, useLocation } from 'react-router-dom';
import Dashboard from './user/Dashboard';
import AdminDashboard from './admin/AdminDashboard';
import Logout from './admin/Logout';
import UserAuth from './UserAuth';
import PrivateRoute from '../PrivateRoute';
import Reservation from './Reservation';
import Home from './Home';
import Actualites from './admin/Actualites';
function AppContent() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');
  const isAdminDashboard = location.pathname.startsWith('/admin/dashboard');


  return (
    <div className="AppContent">
        {!isDashboard && !isAdminDashboard && (
            <nav className="navbar">
                <ul className="nav-list">
                    <li className="nav-item">
                    <Link to="/" className="nav-link">Accueil</Link>
                    </li>
                    <li className="nav-item">
                    <Link to="/reservation" className="nav-link">S'inscrire à l'esport</Link>
                    </li>
                    <li className="nav-item">
                    <Link to="/auth" className="nav-link">S'authentifier</Link>
                    </li>
                </ul>
            </nav>
        )}
        <div className="container">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/reservation" element={<Reservation />} />
                <Route path="/auth" element={<UserAuth />} />
                <Route path="/dashboard" element={
                    <PrivateRoute isAdminRoute={false}>
                        <Dashboard />
                    </PrivateRoute>
                } />
                <Route path="/admin/dashboard/" element={
                    <PrivateRoute isAdminRoute={true}>
                        <AdminDashboard/>
                    </PrivateRoute>
                } />
                <Route path="/admin/dashboard/actualites" element={<Actualites />} />
                <Route path="/logout" element={<Logout />} />
            </Routes>
        </div>
    </div>
  );
}

export default AppContent;