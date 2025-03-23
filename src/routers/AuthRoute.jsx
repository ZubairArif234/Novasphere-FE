import React from "react";
import { Navigate } from "react-router-dom";

const AuthRoute = ({ Component }) => {
  const isAuthenticated = localStorage.getItem("token");
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  } else {
   
      return <Component />;
    
  }
};

export default AuthRoute;
