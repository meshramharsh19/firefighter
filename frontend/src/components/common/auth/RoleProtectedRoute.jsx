import { Navigate } from "react-router-dom";

export default function RoleProtectedRoute({ children, allowedRoles }) {
  const session = sessionStorage.getItem("fireOpsSession");

  if (!session) return <Navigate to="/" />;

  const user = JSON.parse(session);

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/not-access-to-you" />;
  }

  return children;
}
