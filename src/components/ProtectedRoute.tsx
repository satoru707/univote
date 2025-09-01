import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
  studentOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  adminOnly = false, 
  studentOnly = false 
}) => {
  const { isAuthenticated, isAdmin, isStudent } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  if (studentOnly && !isStudent) {
    return <Navigate to="/student/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;