import { Navigate, Outlet, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminAuth from "./AdminAuth";

const AdminProtectedRoutes = () => {
      const { currentUser } = useSelector((state) => state.user)
      const Auth = AdminAuth()
  
      return Auth ? <Outlet/> : <Navigate to="/sign-in"/>
  };
  
  export default AdminProtectedRoutes;
  