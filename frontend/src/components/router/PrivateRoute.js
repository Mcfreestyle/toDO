import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "contexts/authContext";

export default function PrivateRoute() {
  const {user} = useAuthContext();

  if (!user) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
}
