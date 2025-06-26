import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRegistration = ({ children }) => {
  const { query } = useSelector((state) => state.newRegistration);

  return query !== null ? (
    <Navigate to="/validate-new-applicant" replace />
  ) : (
    children
  );
};

export default ProtectedRegistration;
