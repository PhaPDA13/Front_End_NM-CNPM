import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const accessToken = useSelector(state=>state.auth.accessToken)
  return accessToken ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;