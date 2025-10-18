import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  //If no user redirect to login 
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  //If user exist allow access
  return children;
}

