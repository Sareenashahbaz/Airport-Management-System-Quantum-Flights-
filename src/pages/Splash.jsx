import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Splash() {
  const nav = useNavigate();
  useEffect(() => {
    const t = setTimeout(() => nav("/login"), 1800); // 1.8s splash
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="vh-100 d-flex align-items-center justify-content-center bg-primary text-white">
      <div className="text-center">
        <h1 className="display-5">Airport AMS</h1>
        <p className="lead">Manage users, flights & bookings</p>
      </div>
    </div>
  );
}
