import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  //? Destructure useSelector
  const { isAuthenticated } = useSelector((state) => state.auth);

  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
};

export default PrivateRoute;
