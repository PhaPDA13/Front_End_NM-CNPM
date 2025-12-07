import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {

  const isAuth = localStorage.getItem("accessToken"); 

  return isAuth ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRoute;  