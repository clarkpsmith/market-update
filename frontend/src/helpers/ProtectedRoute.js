import React from "react";

import { Redirect } from "react-router-dom";

const ProtectedRoute = ({ Component }) => {
  const isAuthenticated = localStorage.getItem("token");

  return isAuthenticated ? (
    <Component />
  ) : (
    <Redirect to={{ pathname: "/login" }} />
  );
};

export default ProtectedRoute;
