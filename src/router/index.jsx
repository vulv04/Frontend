import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ClientLayout from "../layouts/ClientLayout";
import NotFoundPage from "../pages/common/NotFoundPage";
import AdminLayout from "../layouts/AdminLayout";
import { clientRoutes } from "./clientRoutes";
import { adminRoutes } from "./adminRoutes";
import ProtectedRoute from "../components/ProtecedRoute";
import LoginPage from "../pages/common/LoginPage";
import RegisterPage from "../pages/common/RegisterPage";

const router = createBrowserRouter([
  // * Layout Client
  {
    path: "/",
    element: <ClientLayout />,
    children: clientRoutes,
  },

  // * Layout Admin
  {
    path: "/admin",
    element: <ProtectedRoute allowedRoles={["admin"]} />,
    children: [
      {
        path: "",
        element: <AdminLayout />,
        children: adminRoutes,
      },
    ],
  },

  // * Layout Empty
  { path: "/api/auth/login", element: <LoginPage /> },
  { path: "/api/auth/register", element: <RegisterPage /> },
  { path: "*", element: <NotFoundPage /> },
]);

const AppRouter = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default AppRouter;
