
import useAuthStore from "../store/auth";
import { Navigate } from "react-router-dom";
export const ProtectedRoute = ({ children, role }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role && user?.role !== role) {
    return (
      <Navigate
        to={
          user?.role === "ORGANIZER"
            ? "/organizer/dashboard"
            : "/customer/dashboard"
        }
        replace
      />
    );
  }

  return children;
};
