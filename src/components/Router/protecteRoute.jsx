import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, redirectTo, condition }) => {
  return condition ? children : <Navigate to={redirectTo} />;
};

export default ProtectedRoute;
