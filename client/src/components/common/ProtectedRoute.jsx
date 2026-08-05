import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";

/**
 * ProtectedRoute
 * Wraps route elements that require authentication.
 * If no token exists in the auth store, redirects to /login
 * and preserves the intended destination in location state
 * so the login page can redirect back after auth.
 */
export default function ProtectedRoute({ children }) {
  const token = useAuthStore((s) => s.token);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}
