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
