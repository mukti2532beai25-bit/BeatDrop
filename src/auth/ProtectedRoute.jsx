// ProtectedRoute: only lets logged-in users see the pages inside it.
// If the user is not logged in, they are sent to /login.

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute() {
  const { isLoggedIn, loading } = useAuth();

  // we don't know yet if the user is logged in, so wait
  if (loading) {
    return <p>Loading...</p>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // logged in: show the page inside this route
  return <Outlet />;
}
