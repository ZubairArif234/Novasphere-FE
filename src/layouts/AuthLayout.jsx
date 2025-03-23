import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import authBanner from "../assets/auth.png";
const AuthLayout = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("token");
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, []);
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 h-screen">
      <div className="hidden lg:col-span-2 md:flex justify-center items-center bg-cyan-50">
        <img src={authBanner} alt="auth" className="w-2/3" />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
