import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const isAuth = localStorage.getItem("accessToken");
  
  return isAuth ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;