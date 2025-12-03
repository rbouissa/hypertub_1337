// import React from 'react';
// import { Navigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';

// interface ProtectedRouteProps {
//   children: React.ReactNode;
// }

// export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
//   const { isAuthenticated, user } = useAuth();
//   const location = useLocation();

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   const isAllowed = user?.role === 'superuser' || user?.role === 'admin';

//   // Prevent redirect loop if already on /project-manager
//   if (!isAllowed && (location.pathname !== '/admin-event' && location.pathname !== '/admin-jobs ' && location.pathname !== '/admin-panel ' )) {
//     return <Navigate to="/admin-event" replace />;
//   }

//   return <>{children}</>;
// };


import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  // Not authenticated? Go to login page.
  if (!isAuthenticated) {
    return <Navigate to="/arcair-backoffice/5h2n9t3v8q/" replace />;
  }

  // Only allow admins and superusers
  const isAllowed = user?.role === 'superuser' || user?.role === 'admin';

  // If the user is not allowed and is trying to access a restricted page,
  // redirect them to /admin-event as default fallback
  const openPaths = ['/admin-event', '/admin-jobs', '/admin-panel'];
  if (!isAllowed && !openPaths.includes(location.pathname)) {
    return <Navigate to="/admin-event" replace />;
  }

  // Authorized → render the protected content
  return <>{children}</>;
};
