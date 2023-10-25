import React, { ReactNode } from "react";
import { useAuth } from "../../pages/context/useAuth";
import { Navigate, Route, RouteProps, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  isAdmin?: boolean;
  isSeller?: boolean;
  component: React.ComponentType<any>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isAdmin,
  isSeller,
  component: Component,
  ...rest
}) => {
  const location = useLocation();
  const { auth } = useAuth();
  const isAuthenticated = auth?.user !== null;

  if (isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (isSeller === true && auth?.user?.role !== "seller") {
    return <Navigate to="/login-seller" state={{ from: location }} replace />;
  }

  if (isAdmin === true && auth?.user?.role !== "admin") {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <React.Fragment>
      <Route {...rest} path={rest} element={<Component />} />
    </React.Fragment>
  );
};

export default ProtectedRoute;
