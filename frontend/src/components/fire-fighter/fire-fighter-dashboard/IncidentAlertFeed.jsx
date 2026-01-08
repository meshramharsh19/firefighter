import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardFooter from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import SafeIcon from "@/components/common/SafeIcon";

export default function IncidentAlertFeed({ IncidentAPI_BASE, station }) {
  const [incidents, setIncidents] = useState([]);
  const [playedAlerts, setPlayedAlerts] = useState(new Set());

  const DARK = {
    base: "#121314",
    card: "#17181A",
    border: "#222427",
    hover: "#1f2023",
    text: "#e6e6e6",
    muted: "#8f8f8f",
  };

  const navigate = useNavigate();

  /** 🔥 Fetch Incidents Every 5 Seconds */
  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const res = await fetch(`${IncidentAPI_BASE}/get_incidents.php?station=${encodeURIComponent(station)}`);
        const data = await res.json();
        setIncidents(data);
      } catch (e) {
        console.error("Fetch Error", e);
      }
    };

    fetchIncidents();
    const interval = setInterval(fetchIncidents, 5000);
    return () => clearInterval(interval);
  }, [IncidentAPI_BASE]);

  /** 🔔 Alert Sound for NEW incident (only once) */
  useEffect(() => {
    const newAlerts = incidents.filter(
      (i) => i.isNewAlert && !playedAlerts.has(i.id)
    );

    newAlerts.forEach((incident) => {
      const audio = new Audio(
        "data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA=="
      );
      audio.play().catch(() => {});
      setPlayedAlerts((prev) => new Set([...prev, incident.id]));
    });
  }, [incidents, playedAlerts]);

  const StatusTag = ({ status }) => {
    const palette = {
      new: { bg: "rgba(255,55,55,0.25)", text: "#ff4d4d" },
      assigned: { bg: "rgba(255,180,0,0.25)", text: "#ffcc66" },
      "in-progress": { bg: "rgba(0,140,255,0.25)", text: "#58a6ff" },
      closed: { bg: "rgba(0,255,120,0.25)", text: "#4ade80" },
    };
    const p = palette[status] || palette.new;

    return (
      <Chip
        label={
          status === "in-progress"
            ? "In Progress"
            : status[0].toUpperCase() + status.slice(1)
        }
        size="small"
        sx={{ backgroundColor: p.bg, color: p.text, fontWeight: 600, px: 1 }}
      />
    );
  };

  const formatTime = (str) => {
    const d = new Date(str);
    const diff = (Date.now() - d) / 60000;
    if (diff < 1) return "Just now";
    if (diff < 60) return `${Math.floor(diff)}m ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
    return d.toLocaleDateString();
  };

  /** 🟢 Acknowledge API */
  const acknowledge = (id) => {
    navigate(`/confirm-location/${id}`); // redirect to confirm-location screen
  };

  /** 🟦 View Details click */
  const viewDetails = (id) => {
    alert("View Incident : " + id);
    // Modal/Drawer open logic add later
  };

  if (!incidents.length)
    return (
      <Card
        sx={{
          background: DARK.card,
          color: DARK.text,
          border: `1px solid ${DARK.border}`,
        }}
      >
        <CardContent className="py-10 text-center">
          <SafeIcon
            name="CheckCircle"
            className="h-12 w-12 text-green-400 mx-auto"
          />
          <p className="text-lg font-semibold">No Active Incidents</p>
          <p className="text-sm text-gray-400">No new alerts currently</p>
        </CardContent>
      </Card>
    );

  return (
    <Box sx={{ background: DARK.base }} className="space-y-3 pr-1">
      {incidents.map((inc) => {
        const isNew = inc.isNewAlert;

        return (
          <Card
            key={inc.id}
            sx={{
              background: DARK.card,
              border: `1px solid ${isNew ? "#ff4d4d80" : DARK.border}`,
              boxShadow: isNew ? "0 0 12px 2px rgba(255,60,60,0.30)" : "none",
              transition: "0.2s",
              "&:hover": { background: DARK.hover },
            }}
            className={isNew ? "animate-pulse-slow" : ""}
          >
            <CardHeader
              title={
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-white">{inc.name}</p>
                    <p className="text-xs text-gray-400">{inc.id}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusTag status={inc.status} />
                    {isNew && (
                      <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
                    )}
                    <span className="text-[10px] text-gray-400">
                      {formatTime(inc.timeReported)}
                    </span>
                  </div>
                </div>
              }
            />

            <CardContent className="text-sm space-y-1.5">
              <div className="flex gap-2">
                <SafeIcon name="MapPin" className="h-4 w-4 text-gray-500" />
                <span className="text-gray-400">Location:</span>
                <span className="text-white">{inc.location}</span>
              </div>

              <div className="flex gap-2">
                <SafeIcon name="Crosshair" className="h-4 w-4 text-gray-500" />
                <span className="text-gray-400">Coordinates:</span>
                <span className="font-mono text-[11px] text-gray-200">
                  {inc.coordinates.lat}, {inc.coordinates.lng}
                </span>
              </div>
            </CardContent>

            <CardFooter className="flex gap-2 px-4 pb-4">
              {isNew && (
                <Button
                  fullWidth
                  size="small"
                  onClick={() => acknowledge(inc.id)} // will redirect now
                  sx={{
                    background: "#ff4444",
                    color: "#fff",
                    fontWeight: 600,
                    "&:hover": { background: "#e63939" },
                  }}
                >
                  <SafeIcon name="Check" className="mr-2 h-4 w-4" />
                  Acknowledge
                </Button>
              )}

              <Button
                fullWidth
                size="small"
                onClick={() => viewDetails(inc.id)}
                variant={isNew ? "outlined" : "contained"}
                sx={{
                  borderColor: isNew ? "#ff4d4d" : "transparent",
                  color: isNew ? "#ff6b6b" : "#fff",
                  background: isNew ? "transparent" : "#2563eb",
                }}
              >
                View Details
              </Button>
            </CardFooter>
          </Card>
        );
      })}

      <Divider className="border-[#232427]" />
    </Box>
  );
}
