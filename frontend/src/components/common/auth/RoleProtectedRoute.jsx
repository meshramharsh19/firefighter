import { Navigate } from "react-router-dom";

export default function RoleProtectedRoute({ children, allowedRoles }) {
  const session = sessionStorage.getItem("fireOpsSession");

  if (!session) return <Navigate to="/" />;

  const user = JSON.parse(session);

  // If user role is NOT allowed → redirect
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/not-access-to-you" />;
  }

  return children;
}
