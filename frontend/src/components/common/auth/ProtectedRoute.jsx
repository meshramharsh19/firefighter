import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const sessionData = sessionStorage.getItem("fireOpsSession");

  if (!sessionData) {
    return <Navigate to="/" replace />;
  }

  const session = JSON.parse(sessionData);
  const now = new Date().getTime();
  const expiry = new Date(session.sessionExpiry).getTime();

  if (now > expiry) {
    sessionStorage.removeItem("fireOpsSession");
    return <Navigate to="/?expired=true" replace />;
  }

  return children;
}
