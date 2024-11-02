import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./utils";

interface IPropsProtectedRoute {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<IPropsProtectedRoute> = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
