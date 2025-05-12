// components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) return <Navigate to="/login" />;

  // Vérifie si AU MOINS UN rôle de l'utilisateur est autorisé
  const hasRole = user.roles.some(role => allowedRoles.includes(role));
  if (!hasRole) return <Navigate to="/unauthorized" />;

  return children;
};


export default ProtectedRoute;
