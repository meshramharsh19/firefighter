import { Navigate } from "react-router-dom";

export default function RoleProtectedRoute({
  children,
  allowedRoles,
}) {
  const session =
    localStorage.getItem("fireOpsSession");

  console.log("Allowed:", allowedRoles);

  if (!session) {
    console.log("No Session");
    return <Navigate to="/" />;
  }

  const user = JSON.parse(session);

  console.log("User Role:", user.role);

  if (!allowedRoles.includes(user.role)) {
    console.log("Role Mismatch");
    return <Navigate to="/not-access-to-you" />;
  }

  console.log("Role Matched");
console.log("Allowed Roles:", allowedRoles);
console.log("User Role:", user.role);
  return children;
}