import React from "react";
import SafeIcon from "@/components/common/SafeIcon";
import { useTheme } from "@/Context/ThemeContext";

export default function VehicleAvailabilityPanel({ vehicles = [], drones = [] }) {

  const { toggleTheme } = useTheme();  

  // GLOBAL UI THEME TOKENS (Matches whole dashboard now)
  const UI = {
    card: "bg-[#17181A] border border-[#25272A] shadow-sm rounded-xl p-5",
    text: "text-gray-200",
    muted: "text-gray-400",
    border: "border-[#25272A]",
    hover: "hover:border-red-500 hover:shadow-[0_0_14px_rgba(255,60,60,0.35)] transition-all duration-300",
  };

  // Count Stats
  const available = vehicles.filter(v => v.status === "Disponible").length;
  const busy = vehicles.filter(v => v.status !== "Disponible").length;

  // Status Badge Style Map (consistent with dashboard)
  const statusColors = {
    Disponible: "bg-green-500/25 text-green-300 border border-green-500/40",
    "En Ruta": "bg-blue-500/25 text-blue-300 border border-blue-500/40",
    Ocupado: "bg-yellow-400/25 text-yellow-300 border border-yellow-500/40",
    "En Mantenimiento": "bg-red-500/30 text-red-300 border border-red-500/60",
  };

  const droneColors = {
    Disponible: "bg-green-500/25 text-green-300 border border-green-500/40",
    "Ocupado en Misión": "bg-red-500/30 text-red-300 border border-red-500/60",
    Cargando: "bg-yellow-500/25 text-yellow-300 border border-yellow-400/50",
    "En Mantenimiento": "bg-red-500/30 text-red-300 border border-red-500/60",
  };

  return (
    <div className="space-y-6">

      {/* 🌗 Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="w-full py-2 rounded-lg border border-[#25272A] bg-[#17181A] text-gray-200 
        hover:border-red-500 hover:shadow-[0_0_10px_rgba(255,60,60,0.4)] transition flex items-center justify-center gap-2"
      >
        <SafeIcon name="SunMoon" className="h-4 w-4" />
        Toggle Theme
      </button>

      {/* 🚨 Station Status Card */}
      <div className={UI.card}>
        <h2 className={`text-lg font-semibold flex items-center gap-2 ${UI.text}`}>
          <SafeIcon name="Broadcast" className="h-5 w-5 text-red-500" />
          Station Assets Overview
        </h2>
        <p className={`text-sm ${UI.muted}`}>Central Fire Station</p>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="rounded-lg border border-[#25272A] bg-[#1D1F25] p-4">
            <p className="text-xs text-gray-400">Available</p>
            <p className="text-3xl font-bold text-green-400">{available}</p>
          </div>
          <div className="rounded-lg border border-[#25272A] bg-[#1D1F25] p-4">
            <p className="text-xs text-gray-400">Busy</p>
            <p className="text-3xl font-bold text-yellow-300">{busy}</p>
          </div>
        </div>
      </div>

      {/* 🚒 Vehicles */}
      <div className={UI.card}>
        <h2 className={`text-lg font-semibold flex items-center gap-2 mb-4 ${UI.text}`}>
          <SafeIcon name="Truck" className="h-5 w-5 text-red-500" />
          Vehicles ({vehicles.length})
        </h2>

        <div className="space-y-3">
          {vehicles.map(v => (
            <div 
              key={v.id}
              className={`p-4 rounded-lg border bg-[#17181A] cursor-pointer ${UI.border} ${UI.hover}`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className={`font-medium ${UI.text}`}>{v.name}</p>
                  <p className={`text-xs ${UI.muted}`}>{v.vehicleType}</p>
                </div>

                <span className={`px-3 py-1 text-xs rounded-md ${statusColors[v.status]}`}>
                  {v.status}
                </span>
              </div>

              {v.crew?.length > 0 && (
                <div className="mt-3 text-xs">
                  <p className="text-red-400 font-medium mb-1">Crew Assigned</p>
                  {v.crew.map(member => (
                    <p key={member.id} className={UI.text}>
                      {member.name} — <span className="text-red-300">{member.role}</span>
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 🚁 Drones */}
      <div className={UI.card}>
        <h2 className={`text-lg font-semibold flex items-center gap-2 mb-4 ${UI.text}`}>
          <SafeIcon name="Plane" className="h-5 w-5 text-red-500" />
          Drones ({drones.length})
        </h2>

        <div className="space-y-3">
          {drones.map(d => (
            <div 
              key={d.id}
              className={`p-4 rounded-lg border bg-[#17181A] cursor-pointer ${UI.border} ${UI.hover}`}
            >
              <div className="flex justify-between items-center">
                <p className={`font-medium ${UI.text}`}>{d.name}</p>

                <span className={`px-3 py-1 text-xs rounded-md ${droneColors[d.status]}`}>
                  {d.status}
                </span>
              </div>

              {/* Battery */}
              <div className="mt-2">
                <p className="text-xs text-gray-300 font-medium">
                  Battery: {d.battery}%
                </p>

                <div className="w-full h-2 bg-[#202226] rounded mt-1">
                  <div
                    className="h-2 rounded transition-all"
                    style={{
                      width:`${d.battery}%`,
                      backgroundColor: d.battery < 25 ? "#dc2626" : "#f43f5e"
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🚨 Action Button */}
      <button 
        className="w-full py-3 rounded-lg bg-red-600 text-white font-semibold shadow border border-red-700
        hover:bg-red-500 hover:shadow-[0_0_18px_rgba(255,60,60,0.4)] transition-all">
        <SafeIcon name="AlertTriangle" className="inline h-4 w-4 mr-2" />
        Request Additional Assets
      </button>
    </div>
  );
}
