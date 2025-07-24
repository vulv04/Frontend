import React from "react";
import SettingsPage from "../pages/admin/SettingsPage";
import CategoryListPage from "../pages/admin/CategoryListPage";
import CategoryFormPage from "../pages/admin/CategoryFormPage";
import OrderFormPage from "../pages/admin/OrderFormPage";
import OrderDetailPage from "../pages/admin/OrderDetailPage";
import ProfileFormPage from "../pages/admin/ProfileFormPage";
import BlogFormPage from "../pages/admin/BlogFormPage";
import DashBoardPage from "../pages/admin/DashBoardPage";
import OrderListPage from "../pages/admin/OrderListPage";
import BannerPage from "../pages/admin/BannerPage";
import BrandsPage from "../pages/admin/BrandsPage";
import BrandsFormPage from "../components/brands/BrandsFormPage";
import BannerFormPage from "../components/banner/BannerFormPage";
import ProductFormPageEdit from "../pages/admin/products/ProductFormPageEdit";
import ProductListPage from "../pages/admin/products/ProductListPage";
import ProductDetailPage from "../pages/admin/products/ProductDetailPage";
import ProductTrashPage from "../pages/admin/products/ProductTrashPage";
import ProductFormPageCreate from "../pages/admin/products/ProductFormPageCreate";
import ProfileListPage from "../pages/admin/ProfileListPage";
import AdminProfilePage from "../pages/admin/AdminProfilePage";
import BrandTrashPage from "../components/brands/BrandTrashPage";
export const adminRoutes = [
  { index: true, element: <DashBoardPage /> },
  { path: "settings", element: <SettingsPage /> },
  { path: "me/profile/:id", element: <AdminProfilePage /> }, // User profile page

  // * Products routes
  { path: "products", element: <ProductListPage /> },
  { path: "products/:id", element: <ProductDetailPage /> },
  { path: "products/edit/:id", element: <ProductFormPageEdit /> },
  { path: "products/add", element: <ProductFormPageCreate /> },
  { path: "/admin/products/trash", element: <ProductTrashPage /> },
  // * Categories routes
  { path: "categories", element: <CategoryListPage /> },
  { path: "categories/edit/:id", element: <CategoryFormPage /> },
  { path: "categories/add", element: <CategoryFormPage /> },

  // * Orders routes
  { path: "orders", element: <OrderListPage /> },
  { path: "orders/:id", element: <OrderDetailPage /> },
  { path: "orders/edit/:id", element: <OrderFormPage /> },
  { path: "orders/add", element: <OrderFormPage /> },

  // * Users routes
  { path: "users", element: <ProfileListPage /> },
  { path: "users/edit/:id", element: <ProfileFormPage /> },
  { path: "users/add", element: <ProfileFormPage /> },

  // * Blog routes
  { path: "blogs", element: <BlogFormPage /> },
  { path: "blogs/edit/:id", element: <BlogFormPage /> },
  { path: "blogs/add", element: <BlogFormPage /> },

  // * Banners
  { path: "banners", element: <BannerPage /> },
  { path: "banners/add", element: <BannerFormPage /> },
  { path: "banners/edit/:id", element: <BannerFormPage /> },

  // * Brands
  { path: "brands", element: <BrandsPage /> },
  { path: "brands/add", element: <BrandsFormPage /> },
  { path: "brands/edit/:id", element: <BrandsFormPage /> },
  { path: "/admin/brands/trash", element: <BrandTrashPage /> },
];
