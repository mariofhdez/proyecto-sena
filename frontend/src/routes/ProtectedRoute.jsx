import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token"); // Replace with your authentication logic

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
