import React from "react";
import { useTheme } from "@/Context/ThemeContext";
import { Button } from "@/components/ui/button";
import SafeIcon from "@/components/common/SafeIcon";

export default function PilotDashboardContent() {
  const { isDark } = useTheme();

  const handleGoToLogin = () => {
    sessionStorage.clear();
    window.location.href = "/";
  };

  const handleGoToPilot = () => {
    window.location.href = "http://52.66.237.31:8081/";
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
        <SafeIcon
          name="Plane"
          size={60}
          className="text-red-500"
        />
      </div>

      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-2 text-center">
        Pilot Dashboard is Under Development
      </h1>

      {/* SUB-TEXT */}
      <p className="text-gray-400 text-center max-w-md mb-6">
        Our development team is currently building the full Pilot control panel.
        You will soon be able to manage flight operations, route approvals,
        mission logs, and more.
        You can also use our Beta version 
      </p>

      {/* BUTTON */}
      <Button
        onClick={handleGoToPilot}
        className="px-6 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
      >
        <SafeIcon name="LogIn" size={18} />
        Visit Beta Version
      </Button>
    </div>
  );
}
