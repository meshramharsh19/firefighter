import React from "react";
import { useTheme } from "@/Context/ThemeContext";
import { Button } from "@/components/ui/button";
import SafeIcon from "@/components/common/SafeIcon";
import pilotBg from "../../../public/assets/images/pilot-bg.jpg"; 

export default function PilotDashboardContent() {
  const { isDark } = useTheme();

  const handleGoToPilot = () => {
    window.location.href = "http://52.66.237.31:8081/";
  };

  return (
    <div
  className="flex flex-col items-center justify-center min-h-screen px-6 bg-cover bg-center"
  style={{
    backgroundImage: `
      linear-gradient(
        rgba(0, 0, 0, 0.90),
        rgba(0, 0, 0, 0.85)
      ),
      url(${pilotBg})
    `,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    color: "white",
  }}
>
      <div className="p-6 rounded-full bg-red-600/20 mb-4 backdrop-blur-sm">
        <SafeIcon name="Plane" size={60} className="text-red-500" />
      </div>

      <h1 className="text-3xl font-bold mb-2 text-center">
        Welcome to the Pilot Dashboard
      </h1>

      <p className="text-gray-200 text-center max-w-md mb-6">
        A next-generation control hub built to streamline flight operations, enhance situational awareness, and empower pilots with intelligent insights.
      
      </p>

      <Button
        onClick={handleGoToPilot}
        className="px-6 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
      >
        <SafeIcon name="LogIn" size={18} />
        Drone Control panel
      </Button>
    </div>
  );
}
