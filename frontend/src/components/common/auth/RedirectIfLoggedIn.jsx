import { Navigate } from "react-router-dom";

export default function RedirectIfLoggedIn({ children }) {
  const session = sessionStorage.getItem("fireOpsSession");

  if (session) {
    return <Navigate to="/AdminDashboard" replace />;
  }

  return children;
}
