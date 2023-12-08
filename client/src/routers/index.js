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
import Product from "../pages/Client/Product";
import CartPage from "../pages/Client/Cart";
import PersonalPage from "../pages/Client/PersonalPage";
import AdminOrder from "../pages/Admin/Checkout";
import Contact from "../pages/Client/Contact";
import AdminContact from "../pages/Admin/Contact";
import AboutPage from "../pages/Client/About";
import AdminBuyGuide from "../pages/Admin/GuyBuide";
import BuyGuide from "../pages/Client/BuyGuide";
import AdminChat from "../pages/Admin/Chat";

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
  {
    path: "/product",
    page: <Product />,
  },
  {
    path: "/cart",
    page: <CartPage />,
  },
  {
    path: "/personal",
    page: <PersonalPage />,
  },
  {
    path: "/contact",
    page: <Contact />,
  },
  {
    path: "/about",
    page: <AboutPage />,
  },
  {
    path: "/buy-guide",
    page: <BuyGuide />,
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
  {
    path: "/admin/order",
    page: <AdminOrder />,
  },
  {
    path: "/admin/contact",
    page: <AdminContact />,
  },
  {
    path: "/admin/buy-guide",
    page: <AdminBuyGuide />,
  },
  {
    path: "/admin/chat",
    page: <AdminChat />,
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
