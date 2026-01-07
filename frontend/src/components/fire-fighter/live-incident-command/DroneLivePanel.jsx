"use client";

import React, { useEffect, useRef, useState } from "react";
import SafeIcon from "@/components/common/SafeIcon";
import { useParams } from "react-router-dom";
import { Chip } from "@mui/material";

const BASE_API = import.meta.env.VITE_API_BASE_URL;
// 🔁 FRONTEND MAPPING (SECOND OPTION)
const DRONE_CODE_TO_DB_ID = {
  "DRN-002": 101,
  "DRN-001": 102,
};

const INCIDENT_API =
  `${BASE_API}/incidents/get_incidents.php`;

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

  // URL param = droneCode (DRN-001)
  const { droneId: droneCode } = useParams();

  // map to DB id (101)
  const dbDroneId = DRONE_CODE_TO_DB_ID[droneCode];

  // 🔹 Fetch Drone (CORRECT)
  useEffect(() => {
    if (!dbDroneId) {
      console.warn("❌ No mapping for droneCode:", droneCode);
      setDroneLocations([]);
      return;
    }

    const DRONE_API = `http://13.127.119.7/fire-fighter/get_drone_location.php?droneId=${dbDroneId}`;

    async function getDrone() {
      try {
        const res = await fetch(DRONE_API);
        const data = await res.json();

        if (!data || !data.latitude || !data.longitude) {
          console.warn("❌ Invalid drone data:", data);
          setDroneLocations([]);
          return;
        }

        // ⚠️ iframe expects ARRAY
        setDroneLocations([data]);
      } catch (err) {
        console.error("❌ Drone fetch error:", err);
      }
    }

    getDrone();
    const i = setInterval(getDrone, 5000);
    return () => clearInterval(i);
  }, [droneCode, dbDroneId]);

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
      <div className="flex justify-between mb-2">
        <h3 className="font-semibold text-lg text-white">
          Drone Live 3D View
        </h3>

        <Chip
          label="LIVE"
          size="small"
          color="error"
          className="animate-pulse"
        />
      </div>

      <div className="flex-1 border border-dashed border-[#2E2E2E] rounded-lg overflow-hidden">
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
