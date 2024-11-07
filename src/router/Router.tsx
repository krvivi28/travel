import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import Login from "../pages/Auth/Login/Login";
import { isAuthenticated } from "./utils";
import Home from "../pages/Home/Home";
import Layout from "./Layout";
import ProtectedRoute from "./ProtectedRoute";
import Customers from "../pages/Customer/Customer";
import PageNotFound from "../pages/404/PageNotFound";
import EditTravelPackage from "@src/pages/edit-package";

const routes: RouteObject[] = [
  {
    path: "/login",
    element: isAuthenticated() ? <Navigate to="/" replace /> : <Login />,
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
      { path: "customer", element: <Customers /> },
      {
        path: "customer",
        children: [
          {
            path: ":id",
            element: <EditTravelPackage />,
          },
        ],
      },
    ],
  },
];
const router = createBrowserRouter(routes);
export default router;
