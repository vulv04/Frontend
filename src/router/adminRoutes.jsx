import React from "react";
import DashboardPage from "../pages/admin/DashboardPage";
import SettingsPage from "../pages/admin/SettingsPage";
import ProfilePage from "../pages/admin/ProfilePage";
import ProductListPage from "../pages/admin/ProductListPage";
import CategoryListPage from "../pages/admin/CategoryListPage";
import CategoryFormPage from "../pages/admin/CategoryFormPage";
import ProductFormPage from "../pages/admin/ProductFormPage";
import OrderPage from "../pages/client/OrderPage";
import OrderFormPage from "../pages/admin/OrderFormPage";
import OrderDetailPage from "../pages/admin/OrderDetailPage";
import ProfileFormPage from "../pages/admin/ProfileFormPage";
import BlogFormPage from "../pages/admin/BlogFormPage";
export const adminRoutes = [
  { index: true, element: <DashboardPage /> },
  { path: "settings", element: <SettingsPage /> },
  { path: "me/profile", element: <ProfilePage /> }, // User profile page

  // * Products routes
  { path: "products", element: <ProductListPage /> },
  { path: "products/edit/:id", element: <ProductFormPage /> },
  { path: "products/add", element: <ProductFormPage /> },

  // * Categories routes
  { path: "categories", element: <CategoryListPage /> },
  { path: "categories/edit/:id", element: <CategoryFormPage /> },
  { path: "categories/add", element: <CategoryFormPage /> },

  // * Orders routes
  { path: "orders", element: <OrderPage /> },
  { path: "orders/:id", element: <OrderDetailPage /> },
  { path: "orders/edit/:id", element: <OrderFormPage /> },
  { path: "orders/add", element: <OrderFormPage /> },

  // * Users routes
  { path: "users", element: <ProfilePage /> },
  { path: "users/edit/:id", element: <ProfileFormPage /> },
  { path: "users/add", element: <ProfileFormPage /> },

  // * Blog routes
  { path: "blogs", element: <BlogFormPage /> },
  { path: "blogs/edit/:id", element: <BlogFormPage /> },
  { path: "blogs/add", element: <BlogFormPage /> },
];
