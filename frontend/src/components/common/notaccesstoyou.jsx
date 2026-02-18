import React from "react";
import { useNavigate } from "react-router-dom";
import { ShieldAlert, LogOut } from "lucide-react";
import toast from "react-hot-toast";

export default function AccessDenied() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("fireOpsSession");
    toast("Session ended. Please login again.", { icon: "🚫" });
    navigate("/");
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{
        backgroundColor: "#0d0f12",
        color: "white",
      }}
    >
      <div className="flex items-center justify-center bg-red-900/20 p-6 rounded-full border border-red-800/40 mb-4">
        <ShieldAlert size={50} color="#ff4d4d" />
      </div>

      <h1 className="text-3xl font-bold mb-2">
        Access Denied
      </h1>

      <p className="text-gray-400 text-center max-w-md mb-6">
        You do not have permission to access this page.  
        Please login with the correct role to continue.
      </p>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 
                   text-white px-6 py-3 rounded-lg font-semibold shadow-lg"
      >
        <LogOut size={20} />
        Re-login
      </button>
    </div>
  );
}
