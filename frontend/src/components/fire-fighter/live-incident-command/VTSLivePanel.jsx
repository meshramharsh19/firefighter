"use client";

import React, { useEffect, useRef, useState } from "react";
import SafeIcon from "@/components/common/SafeIcon";
import { Chip } from "@mui/material";

const BASE_API = import.meta.env.VITE_API_BASE_URL;

const INCIDENT_API =
  `${BASE_API}/incidents/get_incidents.php`;

export default function VTSLivePanel({
  onMaximize,
  isMaximized = false,
  onExit,
}) {
  const iframeRef = useRef(null);
  const [iframeReady, setIframeReady] = useState(false);
  const [incident, setIncident] = useState(null);

  /* ---------- Fetch Incident ---------- */
  useEffect(() => {
    async function fetchIncident() {
      try {
        const res = await fetch(INCIDENT_API);
        const data = await res.json();
        const activeIncident = data?.[0] || null;
        setIncident(activeIncident);
      } catch (err) {
        console.error("❌ Incident fetch error:", err);
      }
    }

    fetchIncident();
  }, []);



  

  /* ---------- UI ---------- */
  return (
    <div className={`flex flex-col h-full ${isMaximized ? "p-6" : "p-4"}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <SafeIcon name="Navigation" className="h-5 w-5 text-[#dc2626]" />
          <h3 className={`font-semibold ${isMaximized ? "text-xl" : "text-lg"}`}>
            VTS Live 3D Map
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <Chip
            label="LIVE"
            size="small"
            color="error"
            className="animate-pulse"
          />

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

      {/* MAP (iframe – SAME AS DroneLivePanel) */}
      <div className="flex-1 border border-dashed border-[#2E2E2E] rounded-lg overflow-hidden">
        <iframe
          ref={iframeRef}
          src="/index.html"
          className="w-full h-full border-none"
        />
      </div>
    </div>
  );
}
