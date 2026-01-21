import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

export function PrivateRoute({ children }: Props) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}
