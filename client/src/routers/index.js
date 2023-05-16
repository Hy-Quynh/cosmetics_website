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

const ClientLayoutPage = [
  {
    path: "/",
    page: <HomePage />,
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
