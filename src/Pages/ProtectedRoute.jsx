import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const isAdminLoggedIn = sessionStorage.getItem("token");

  return isAdminLoggedIn ? <Outlet /> : <Navigate to="/" />;
}
