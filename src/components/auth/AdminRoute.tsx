import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const AdminRoute: React.FC = () => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== "admin") {
    return <Navigate to="/forbidden" replace />; // redirect to homepage or 403 page
  }

  return <Outlet />;
};

export default AdminRoute;
