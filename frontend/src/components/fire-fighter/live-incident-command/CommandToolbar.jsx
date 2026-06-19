import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Button,
  Chip,
  Menu,
  MenuItem,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";

import SafeIcon from "@/components/common/SafeIcon";

// ─── Constants ───────────────────────────────────────────────────────────────

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const ENDPOINTS = {
  endMission:      `${API_BASE}/fire-fighter/live-incident-command/end_mission.php`,
  activeIncidents: `${API_BASE}/fire-fighter/fire-fighter-dashboard/get_active_incident.php`,
  activityLog:     `${API_BASE}/fire-fighter/confirm-forward/confirm_location_logs.php`,
  droneMission: `${API_BASE}/fire-fighter/live-incident-command/get_drone_mission.php`,
  exportReport:    (incidentId) => `${API_BASE}/fire-fighter/live-incident-command/export-report.php?incidentId=${incidentId}`,
  controlPanel:    "http://43.205.31.167:8081/",
};

const LAYOUT_TYPES = ["split", "full", "focus"];

const INCIDENT_POLL_INTERVAL_MS = 10_000;

// ─── Theme helper ─────────────────────────────────────────────────────────────

const buildTheme = (isDark) =>
  isDark
    ? {
        toolbarBg:     "#141414",
        toolbarBorder: "#1f1f1f",
        iconBoxBg:     "#291818",
        iconBoxBorder: "#dc2626",
        menuBg:        "#1a1a1a",
        menuColor:     "#ffffff",
        menuHover:     "#2a2a2a",
        menuBorder:    "#2E2E2E",
      }
    : {
        toolbarBg:     "#ffffff",
        toolbarBorder: "#e2e8f0",
        iconBoxBg:     "#fff1f2",
        iconBoxBorder: "#dc2626",
        menuBg:        "#ffffff",
        menuColor:     "#111827",
        menuHover:     "#f3f4f6",
        menuBorder:    "#e2e8f0",
      };

// ─── Custom hooks ─────────────────────────────────────────────────────────────

function useDarkMode() {
  const [isDark, setIsDark] = useState(
    () => document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes:      true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return isDark;
}

function useActiveIncidents() {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const res  = await fetch(ENDPOINTS.activeIncidents);
        const data = await res.json();

        if (data.success) {
          setIncidents(data.incidents);
        }
      } catch (err) {
        console.error("Error fetching incidents:", err);
      }
    };

    fetchIncidents();

    const interval = setInterval(fetchIncidents, INCIDENT_POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  return incidents;
}

// ─── API helpers ─────────────────────────────────────────────────────────────

async function logActivity({ action, description, incidentId }) {
  try {
    const session = JSON.parse(localStorage.getItem("fireOpsSession"));

    await fetch(ENDPOINTS.activityLog, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({
        user_id:     session.userId,
        user_name:   session.name,
        role:        session.role,
        action,
        module:      "INCIDENT",
        description,
        incident_id: incidentId,
      }),
    });
  } catch (err) {
    console.error("Log activity error:", err);
  }
}

async function endMissionRequest(incidentId) {
  const res  = await fetch(ENDPOINTS.endMission, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify({ incidentId }),
  });

  const text = await res.text();

  try {
    return JSON.parse(text);
  } catch {
    console.error("Failed to parse end-mission response:", text);
    throw new Error("Invalid JSON response from server");
  }
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function IncidentSelect({ incidents, value, onChange, isDark }) {
  return (
    <FormControl
      sx={{
        minWidth: 320,
        "& .MuiOutlinedInput-root": {
          height:          60,
          color:           isDark ? "#fff" : "#000",
          backgroundColor: isDark ? "#1a1a1a" : "#fff",
          "& fieldset":            { borderColor: "#dc2626", borderWidth: "2px" },
          "&:hover fieldset":      { borderColor: "#ef4444" },
          "&.Mui-focused fieldset":{ borderColor: "#dc2626", borderWidth: "2px" },
        },
        "& .MuiSvgIcon-root": { color: "#ffffff" },
      }}
    >
      <Select
        value={value}
        onChange={onChange}
        renderValue={(selected) => {
          const incident = incidents.find((i) => i.id === selected);
          return incident ? (
            <div>
              <div style={{ fontWeight: 600 }}>{incident.name}</div>
              <div style={{ fontSize: "11px", opacity: 0.7 }}>{incident.id}</div>
            </div>
          ) : (
            "Loading..."
          );
        }}
      >
        {incidents.map((incident) => (
          <MenuItem key={incident.id} value={incident.id}>
            <div>
              <div style={{ fontWeight: 600 }}>{incident.name}</div>
              <div style={{ fontSize: 11, opacity: 0.7 }}>{incident.id}</div>
            </div>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

function LayoutButtons({ layout, onLayoutChange }) {
  return (
    <>
      {LAYOUT_TYPES.map((type) => (
        <Button
          key={type}
          variant={layout === type ? "contained" : "outlined"}
          size="small"
          onClick={() => onLayoutChange(type)}
          sx={{
            backgroundColor: layout === type ? "#dc2626" : "transparent",
            color:           layout === type ? "#fff" : undefined,
          }}
        >
          {type}
        </Button>
      ))}
    </>
  );
}

function EndMissionDialog({ open, loading, incidentName, onConfirm, onCancel }) {
  return (
    <Dialog open={open} onClose={() => !loading && onCancel()}>
      <DialogTitle>⚠️ End Mission</DialogTitle>

      <DialogContent>
        <Typography>
          Are you sure you want to end this mission?
          <br />
          <b>{incidentName}</b>
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onCancel} disabled={loading}>
          Cancel
        </Button>

        <Button
          onClick={onConfirm}
          color="error"
          variant="contained"
          disabled={loading}
        >
          {loading ? "Ending..." : "Confirm"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function CommandToolbar({
  layout,
  onLayoutChange,
  onFullscreen,
  onExitFullscreen,
  isFullscreen,
  incidentId,
  incidentName,
}) {
  const navigate = useNavigate();

  // ── State ──────────────────────────────────────────────────────────────────
  const [selectedIncident, setSelectedIncident] = useState("");
  const [menuAnchorEl,     setMenuAnchorEl]     = useState(null);
  const [confirmOpen,      setConfirmOpen]      = useState(false);
  const [loading,          setLoading]          = useState(false);

  // ── Derived ────────────────────────────────────────────────────────────────
  const isDark    = useDarkMode();
  const incidents = useActiveIncidents();
  const C         = buildTheme(isDark);
  const menuOpen  = Boolean(menuAnchorEl);

  // ── Effects ────────────────────────────────────────────────────────────────

  // Auto-select the first incident once loaded
  useEffect(() => {
    if (incidents.length > 0 && !selectedIncident) {
      setSelectedIncident(incidents[0].id);
    }
  }, [incidents, selectedIncident]);

  // ── Handlers ───────────────────────────────────────────────────────────────

const handleIncidentChange = useCallback(
  async (event) => {
    const selectedIncidentId = event.target.value;

    setSelectedIncident(selectedIncidentId);
    // console.log(selectedIncidentId)

    try {
      const res = await fetch(ENDPOINTS.droneMission);
      const data = await res.json();

      if (!data.success) {
        toast.error("Failed to load mission");
        return;
      }

     const mission = data.data
  .filter(
    (m) =>
      m.incident_id === selectedIncidentId &&
      m.status === "started"
  )
  .sort((a, b) => b.id - a.id)[0];

      if (!mission) {
        toast.error("No active mission found");
        return;
      }

      const droneId = mission.drone_id;
      // console.log(droneId)
      const vehicleId = mission.vehicle_id;
      // console.log(vehicleId)

      const url = `/live-incident-command/${selectedIncidentId}/${String(
        droneId
      ).padStart(3, "0")}/${String(vehicleId).padStart(3, "0")}`;

      // console.log("Navigating to:", url);

      navigate(url);
    } catch (err) {
      console.error(err);
      toast.error("Failed to switch incident");
    }
  },
  [navigate]
);

  const handleMenuOpen  = (e) => setMenuAnchorEl(e.currentTarget);
  const handleMenuClose = ()  => setMenuAnchorEl(null);

  const handleExportReport = async () => {
    handleMenuClose();

    await logActivity({
      action:      "EXPORT_REPORT",
      description: `Exported report for Incident ${incidentId}`,
      incidentId,
    });

    const win = window.open(ENDPOINTS.exportReport(incidentId), "_blank");
    win.onload = () => win.print();
  };

  const handleEndMissionClick = () => {
    handleMenuClose();
    setConfirmOpen(true);
  };

  const handleEndMissionConfirm = async () => {
    try {
      setLoading(true);

      const data = await endMissionRequest(incidentId);

      if (!data.success) {
        toast.error(data.error || "Failed to end mission ❌");
        return;
      }

      await logActivity({
        action:      "END_MISSION",
        description: `Mission ended for Incident ${incidentId}`,
        incidentId,
      });

      toast.success("Mission Ended ✅");
      setConfirmOpen(false);

      setTimeout(() => navigate("/fire-fighter-dashboard"), 500);
    } catch (err) {
      console.error(err);
      toast.error("Error ending mission ❌");
    } finally {
      setLoading(false);
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <>
      {/* ── Toolbar ── */}
      <div
        className="backdrop-blur-sm p-4"
        style={{
          backgroundColor: C.toolbarBg,
          borderBottom:    `1px solid ${C.toolbarBorder}`,
        }}
      >
        <div className="flex items-center justify-between gap-4">

          {/* Left — incident selector */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-lg"
              style={{
                backgroundColor: C.iconBoxBg,
                border:          `1px solid ${C.iconBoxBorder}`,
              }}
            >
              <SafeIcon name="AlertTriangle" className="h-5 w-5 text-primary" />
            </div>

            <IncidentSelect
              incidents={incidents}
              value={selectedIncident}
              onChange={handleIncidentChange}
              isDark={isDark}
            />

            <Chip
              label={
                <span className="flex items-center gap-1">
                  <span className="mr-1.5 h-2 w-2 rounded-full bg-white" />
                  LIVE
                </span>
              }
              color="error"
              className="ml-2 animate-pulse"
              size="small"
            />
          </div>

          {/* Center — layout controls */}
          <div className="flex items-center gap-2">
            <LayoutButtons layout={layout} onLayoutChange={onLayoutChange} />

            <Button
              variant="outlined"
              size="small"
              onClick={() => window.open(ENDPOINTS.controlPanel, "_blank")}
            >
              Control Panel
            </Button>
          </div>

          {/* Right — actions */}
          <div className="flex items-center gap-2">
            <Button
              size="small"
              onClick={isFullscreen ? onExitFullscreen : onFullscreen}
            >
              <SafeIcon
                name={isFullscreen ? "Minimize2" : "Maximize"}
                className="h-4 w-4"
              />
            </Button>

            <IconButton onClick={handleMenuOpen}>
              <SafeIcon name="MoreVertical" className="h-4 w-4" />
            </IconButton>

            <Menu anchorEl={menuAnchorEl} open={menuOpen} onClose={handleMenuClose}>
              <MenuItem onClick={handleExportReport}>
                Export Report
              </MenuItem>

              <Divider />

              <MenuItem
                onClick={handleEndMissionClick}
                sx={{ color: "red" }}
                disabled={loading}
              >
                {loading ? "Ending..." : "End Mission"}
              </MenuItem>
            </Menu>

            <Button
              size="small"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate("/fire-fighter-dashboard")}
            >
              Back
            </Button>
          </div>
        </div>
      </div>

      {/* ── End-mission confirmation dialog ── */}
      <EndMissionDialog
        open={confirmOpen}
        loading={loading}
        incidentName={incidentName}
        onConfirm={handleEndMissionConfirm}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  );
}