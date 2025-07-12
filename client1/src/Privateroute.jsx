

// src/PrivateRoute.jsx

import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

export default function PrivateRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>; // Wait for verification
  if (!user) return <Navigate to="/login" replace />;

  return children;
}


