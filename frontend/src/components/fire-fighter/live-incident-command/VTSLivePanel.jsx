"use client";

import React, { useEffect, useRef, useState } from "react";
import SafeIcon from "@/components/common/SafeIcon";
import { Chip } from "@mui/material";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const BASE_API = import.meta.env.VITE_API_BASE_URL;

const INCIDENT_API = `${BASE_API}/fire-fighter/fire-fighter-dashboard/get_incidents.php`;
const DRONE_API = `${BASE_API}/drones/get_live_location.php`;

export default function VTSLivePanel({
  onMaximize,
  isMaximized = false,
  onExit,
}) {
  const iframeRef = useRef(null);

  // Leaflet refs
  const mapContainerRef = useRef(null);
  const leafletMapRef = useRef(null);
  const droneMarkerRef = useRef(null);

  const [incident, setIncident] = useState(null);
  const [mapMode, setMapMode] = useState("2d"); 

  /* ---------- Fetch Incident ---------- */
  useEffect(() => {
    async function fetchIncident() {
      try {
        const res = await fetch(INCIDENT_API);
        const data = await res.json();
        setIncident(data?.[0] || null);
      } catch (err) {
        console.error("❌ Incident fetch error:", err);
      }
    }
    fetchIncident();
  }, []);

  /* ---------- Init Leaflet Map ---------- */
  useEffect(() => {
    if (mapMode !== "2d") return;
    if (leafletMapRef.current) return;

    leafletMapRef.current = L.map(mapContainerRef.current).setView(
      [20.5937, 78.9629],
      5
    );

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap",
    }).addTo(leafletMapRef.current);

    return () => {
      leafletMapRef.current?.remove();
      leafletMapRef.current = null;
      droneMarkerRef.current = null;
    };
  }, [mapMode]);

  /* ---------- Live Drone Tracking ---------- */
  useEffect(() => {
    if (mapMode !== "2d") return;

    let interval;

    async function fetchDroneLocation() {
      try {
        const res = await fetch(DRONE_API);
        const data = await res.json();
        if (!data?.lat || !data?.lng) return;

        const latLng = [parseFloat(data.lat), parseFloat(data.lng)];

        if (!droneMarkerRef.current) {
          droneMarkerRef.current = L.marker(latLng).addTo(leafletMapRef.current);
          leafletMapRef.current.setView(latLng, 15);
        } else {
          droneMarkerRef.current.setLatLng(latLng);
        }
      } catch (err) {
        console.error("❌ Drone location fetch error:", err);
      }
    }

    fetchDroneLocation();
    interval = setInterval(fetchDroneLocation, 5000);

    return () => clearInterval(interval);
  }, [mapMode]);

  /* ---------- UI ---------- */
  return (
    <div className={`flex flex-col h-full ${isMaximized ? "p-6" : "p-4"}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <SafeIcon name="Navigation" className="h-5 w-5 text-[#dc2626]" />
          <h3 className={`font-semibold ${isMaximized ? "text-xl" : "text-lg"}`}>
            VTS Live Map
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <Chip
            label="LIVE"
            size="small"
            color="error"
            className="animate-pulse"
          />

          {/* 🧭 Capsule Toggle */}
          <div className="relative flex items-center bg-black/70 border border-[#2E2E2E] rounded-full p-1 w-[110px] h-8">
            {/* Sliding Active Background */}
            <div
              className={`absolute top-1 bottom-1 w-1/2 rounded-full bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.7)] transition-all duration-300 ${
                mapMode === "3d" ? "left-[50%]" : "left-1"
              }`}
            />

            <button
              onClick={() => setMapMode("2d")}
              className={`relative z-10 w-1/2 text-xs font-semibold transition-colors ${
                mapMode === "2d" ? "text-white" : "text-gray-400"
              }`}
            >
              2D
            </button>

            <button
              onClick={() => setMapMode("3d")}
              className={`relative z-10 w-1/2 text-xs font-semibold transition-colors ${
                mapMode === "3d" ? "text-white" : "text-gray-400"
              }`}
            >
              3D
            </button>
          </div>

          {!isMaximized && (
            <button onClick={onMaximize} className="p-1 hover:bg-muted rounded">
              <SafeIcon name="Maximize2" className="h-4 w-4" />
            </button>
          )}

          {isMaximized && (
            <button onClick={onExit} className="p-1 hover:bg-muted rounded">
              <SafeIcon name="X" className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 border border-dashed border-[#2E2E2E] rounded-lg overflow-hidden">
        {mapMode === "3d" ? (
          <iframe
            ref={iframeRef}
            src="/index.html"
            className="w-full h-full border-none"
            title="3D Map"
          />
        ) : (
          <div ref={mapContainerRef} className="w-full h-full" />
        )}
      </div>
    </div>
  );
}
