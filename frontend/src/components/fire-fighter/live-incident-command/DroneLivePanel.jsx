"use client";

import React, { useEffect, useRef, useState } from "react";
import SafeIcon from "@/components/common/SafeIcon";
import { useParams } from "react-router-dom";
import { Chip } from "@mui/material";

const DRONE_API =
  "http://localhost/fire-fighter-new/backend/controllers/get_drone_locations.php";

const INCIDENT_API =
  "http://localhost/fire-fighter-new/backend/controllers/incidents/get_incidents.php";

export default function DroneLivePanel({
  incidentId,
  onMaximize,
  isMaximized = false,
  onExit,
}) {
  const iframeRef = useRef(null);
  const [iframeReady, setIframeReady] = useState(false);
  const [droneLocations, setDroneLocations] = useState([]);
  const [incident, setIncident] = useState(null);

  const { droneId } = useParams();

  // 🔹 Fetch Drone Locations
  useEffect(() => {
    async function getDrones() {
      const res = await fetch(DRONE_API);
      const data = await res.json();

      const selected = data.filter(
        (d) => String(d.drone_code) === String(droneId)
      );

      setDroneLocations(selected);
    }

    getDrones();
    const i = setInterval(getDrones, 5000);
    return () => clearInterval(i);
  }, [droneId]);

  // 🔹 Fetch Incident
  useEffect(() => {
    async function getIncident() {
      const res = await fetch(INCIDENT_API);
      const data = await res.json();

      const found = data.find((i) => i.id === incidentId);
      setIncident(found || null);
    }

    if (incidentId) getIncident();
  }, [incidentId]);

  const handleIframeLoad = () => setIframeReady(true);

  // 🔹 Send data to iframe
  useEffect(() => {
    if (!iframeReady || !iframeRef.current?.contentWindow) return;

    iframeRef.current.contentWindow.postMessage(
      { type: "DRONE_POSITIONS", data: droneLocations },
      "*"
    );

    if (incident?.coordinates) {
      iframeRef.current.contentWindow.postMessage(
        {
          type: "FIRE_HAZARD_POINT",
          payload: {
            lat: incident.coordinates.lat,
            lng: incident.coordinates.lng,
            height: 100,
          },
        },
        "*"
      );
    }
  }, [iframeReady, droneLocations, incident]);

  return (
    <div className={`flex flex-col h-full ${isMaximized ? "p-6" : "p-4"}`}>

      {/* HEADER (MATCHES VTS LIVE PANEL) */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <SafeIcon name="Drone" className="h-5 w-5 text-[#dc2626]" />
          <h3 className={`font-semibold ${isMaximized ? "text-xl" : "text-lg"}`}>
            Drone Live 3D View
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <Chip
            label={
              <span className="px-2 py-0.5 text-xs bg-red-600 text-white rounded animate-pulse">
                LIVE
              </span>
            }
            color="error"
            size="small"
            className="animate-pulse text-xs"
          />

          {/* ⛶ Maximize */}
          {!isMaximized && (
            <button
              onClick={onMaximize}
              className="p-1 hover:bg-muted rounded"
            >
              <SafeIcon name="Maximize2" className="h-4 w-4" />
            </button>
          )}

          {/* ✕ Exit */}
          {isMaximized && (
            <button
              onClick={onExit}
              className="p-1 hover:bg-muted rounded"
            >
              <SafeIcon name="X" className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* IFRAME */}
      <div
        className="flex-1 rounded-lg overflow-hidden border-2 border-dashed border-[#2E2E2E]"
        style={{
          height: isMaximized ? "100%" : "300px",
          width: "100%",
        }}
      >
        <iframe
          ref={iframeRef}
          onLoad={handleIframeLoad}
          src="/drone-map.html"
          className="w-full h-full border-none"
        />
      </div>
    </div>
  );
}
