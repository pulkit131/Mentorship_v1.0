
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const allowedUserId = "9m1CekNjkERX5mLZWcQIdZGiXdG3";
  const currentUserId = localStorage.getItem("userId");

  if (currentUserId !== allowedUserId) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
