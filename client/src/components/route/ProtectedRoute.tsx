import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";

interface ProtectedRouteProps {
  isAdmin?: boolean;
  isSeller?: boolean;
  component: React.ComponentType<any>;
  path: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isAdmin,
  isSeller,
  component: Component,
  path,
  ...rest
}) => {
  const { loading: userLoading, isAuthenticated: userIsAuthenticated, user } =
    useAppSelector((state: RootState) => state.user);
  const { loading: sellerLoading, isAuthenticated: sellerIsAuthenticated, seller } =
    useAppSelector((state: RootState) => state.seller);

  // Combine the loading and isAuthenticated states
  const loading = userLoading || sellerLoading;
  const isAuthenticated = userIsAuthenticated || sellerIsAuthenticated;

  return (
    <Route
      {...rest}
     
      render={(props) => {
        if (loading === "idle") {
          if (isAuthenticated) {
            if (isAdmin && user?.role !== "admin") {
              return <Navigate to="/login" />;
            }
            if (isSeller && seller?.role !== "seller") {
              return <Navigate to="/login" />;
            }
            return <Component {...props} />;
          } else {
            return <Navigate to="/login" />;
          }
        }
        return null; // Loading is not idle, don't render anything
      }}
    />
  );
};

export default ProtectedRoute;
