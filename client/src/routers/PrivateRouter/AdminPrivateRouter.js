import React from "react";
import { Navigate } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import { USER_INFO_KEY } from "../../utils/contants";

const AdminPrivateRouter = (props) => {
  let customerData = JSON.parse(localStorage.getItem(USER_INFO_KEY));
  return customerData && customerData.type === "admin" ? (
    <AdminLayout {...props} />
  ) : (
    <Navigate to="/login" />
  );
};

export default AdminPrivateRouter;
