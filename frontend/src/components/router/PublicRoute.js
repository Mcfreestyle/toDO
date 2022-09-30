import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "contexts/authContext";

export default function PublicRoute() {
  const {user} = useAuthContext();
  if (user) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
}
