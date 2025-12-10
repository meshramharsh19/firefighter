import React from "react";
import { useTheme } from "@/Context/ThemeContext";
import { Button } from "@/components/ui/button";
import SafeIcon from "@/components/common/SafeIcon";

export default function VehicleDriverContent() {
  const { isDark } = useTheme();

  const handleGoToLogin = () => {
    sessionStorage.clear();
    window.location.href = "/";
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen px-6"
      style={{
        backgroundColor: isDark ? "#0d0f12" : "#f7f7f7",
        color: isDark ? "white" : "black",
      }}
    >
      {/* ICON */}
      <div className="p-6 rounded-full bg-red-600/20 mb-4">
        <SafeIcon name="Truck" size={60} className="text-red-500" />
      </div>

      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-2 text-center">
        Vehicle Driver Dashboard is Under Development
      </h1>

      {/* SUBTEXT */}
      <p className="text-gray-400 text-center max-w-md mb-6">
        The driver operations dashboard is currently being developed. Soon you 
        will be able to view assigned routes, emergency dispatch requests, GPS 
        tracking features, and real-time communication tools.
      </p>

      {/* BUTTON */}
      <Button
        onClick={handleGoToLogin}
        className="px-6 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
      >
        <SafeIcon name="LogIn" size={18} />
        Go to Login Page
      </Button>
    </div>
  );
}
