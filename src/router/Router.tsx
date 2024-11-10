import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import Login from "../pages/Auth/Login/Login";
import Signup from "@src/pages/Auth/Signup/Signup";
import { isAuthenticated } from "./utils";
import Home from "../pages/Home/Home";
import Layout from "./Layout";
import ProtectedRoute from "./ProtectedRoute";
import Customers from "../pages/Customer/Customer";
import ChangeProfile from "../pages/ChangeProfile/ChangeProfile";
import PageNotFound from "../pages/404/PageNotFound";
import EditTravelPackage from "@src/pages/edit-package";
import ForgotPassword from "@src/pages/Auth/Forgot-password/ForgotPassword";
import ResetPassword from "@src/pages/Auth/Reset-password/ResetPassword";

const routes: RouteObject[] = [
  {
    path: "/login",
    element: isAuthenticated() ? <Navigate to="/" replace /> : <Login />,
  },
  {
    path: "/signup",
    element: isAuthenticated() ? <Navigate to="/" replace /> : <Signup />,
  },
  {
    path: "/password/forgot",
    element: isAuthenticated() ? (
      <Navigate to="/" replace />
    ) : (
      <ForgotPassword />
    ),
  },
  {
    path: "/password/reset/:token",
    element: isAuthenticated() ? (
      <Navigate to="/" replace />
    ) : (
      <ResetPassword />
    ),
  },
  {
    path: "/",
    errorElement: <PageNotFound />,
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Home /> },
      {
        path: "customer",
        element: <Customers />,
        children: [
          {
            path: ":id",
            element: <EditTravelPackage />,
          },
        ],
      },
      { path: "change-profile", element: <ChangeProfile /> },
    ],
  },
];
const router = createBrowserRouter(routes);
export default router;
