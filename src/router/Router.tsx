import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import Login from "../pages/Login/Login";
import { isAuthenticated } from "./utils";
import Home from "../pages/Home/Home";
import Layout from "./Layout";
import ProtectedRoute from "./ProtectedRoute";
import Customers from "../pages/Customer/Customer";
import PageNotFound from "../pages/404/PageNotFound";
import CalculateB2B from "../pages/CalculateB2B/CalculateB2B";

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
            element: <CalculateB2B />,
          },
        ],
      },
    ],
  },
];
const router = createBrowserRouter(routes);
export default router;
