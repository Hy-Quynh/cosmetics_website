import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserLogin from "../pages/Client/Login";
import UserSignUp from "../pages/Client/SignUp";
import HomePage from "../pages/Client/HomePage";
import ClientLayout from "../layouts/ClientLayout";
import Dashboard from "../pages/Admin/Dashboard";
import AdminPrivateRouter from "./PrivateRouter/AdminPrivateRouter";
import ProductCategory from "../pages/Admin/Category";
import AdminAccount from "../pages/Admin/Account";
import AdminBlog from "../pages/Admin/Blog";
import BlogDetailPage from "../pages/Client/BlogDetail";
import BlogPage from "../pages/Client/Blog";
import AdminProduct from "../pages/Admin/Product";
import ProductDetail from "../pages/Client/ProductDetail";

const ClientLayoutPage = [
  {
    path: "/",
    page: <HomePage />,
  },
  {
    path: "/blog/:blogId",
    page: <BlogDetailPage />,
  },
  {
    path: "/blog",
    page: <BlogPage />,
  },
  {
    path: "/product/:productId",
    page: <ProductDetail />,
  },
];

const AdminLayoutPage = [
  {
    path: "/admin",
    page: <Dashboard />,
  },
  {
    path: "/admin/category",
    page: <ProductCategory />,
  },
  {
    path: "/admin/product",
    page: <AdminProduct />,
  },
  {
    path: "/admin/blog",
    page: <AdminBlog />,
  },
  {
    path: "/admin/account",
    page: <AdminAccount />,
  },
];

export default function MainRouter() {
  return (
    <Router>
      {ClientLayoutPage?.map((item, index) => {
        return (
          <Routes key={`client-router-${index}`}>
            <Route
              exact
              path={item.path}
              element={<ClientLayout>{item?.page}</ClientLayout>}
            />
          </Routes>
        );
      })}

      {AdminLayoutPage?.map((item, index) => {
        return (
          <Routes key={`admin-router-${index}`}>
            <Route
              exact
              path={item.path}
              element={<AdminPrivateRouter>{item?.page}</AdminPrivateRouter>}
            />
          </Routes>
        );
      })}

      <Routes>
        <Route exact path="/login" element={<UserLogin />} />
      </Routes>
      <Routes>
        <Route exact path="/signup" element={<UserSignUp />} />
      </Routes>
    </Router>
  );
}
