import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";

const STATION_API =
  "http://localhost/fire-fighter-new/backend/controllers/getStations.php";

export default function EditVehicleModal({
  open,
  onClose,
  vehicle,
  onUpdate,
}) {
  const [formData, setFormData] = useState(vehicle);
  const [stations, setStations] = useState([]);

  useEffect(() => {
    setFormData(vehicle);
  }, [vehicle]);

  /* ---------- Fetch Stations ---------- */
  useEffect(() => {
    if (!open) return;

    fetch(STATION_API)
      .then((res) => res.json())
      .then((data) => setStations(data || []))
      .catch((err) => console.error("❌ Station fetch error:", err));
  }, [open]);

  if (!formData) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const saveChanges = async () => {
    if (onUpdate) await onUpdate(formData);
    onClose();
  };

  /* 🔴 BLACK + RED THEME INPUT STYLE (UNCHANGED) */
  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      background: "#151619",
      color: "#e3e3e3",
      borderRadius: "10px",
      "& fieldset": { borderColor: "#2a2b2e" },
      "&:hover fieldset": { borderColor: "#ef4444" },
      "&.Mui-focused fieldset": {
        borderColor: "#ef4444",
        boxShadow: "0 0 6px rgba(239,68,68,.6)",
      },
    },
    "& label": { color: "#9ea2a7" },
    "& label.Mui-focused": { color: "#ef4444" },
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          background: "#111214",
          color: "#fff",
          borderRadius: "14px",
          border: "1px solid #1d1e21",
          boxShadow: "0 0 18px rgba(0,0,0,.6)",
        },
      }}
    >
      {/* ---------- TITLE ---------- */}
      <DialogTitle
        sx={{
          borderBottom: "1px solid #25262a",
          pb: 2,
          fontWeight: 600,
        }}
      >
        ✏ Edit Vehicle -{" "}
        <span style={{ color: "#ef4444" }}>{formData.name}</span>
      </DialogTitle>

      {/* ---------- CONTENT ---------- */}
      <DialogContent sx={{ py: 3 }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          <TextField label="Vehicle Name" name="name" value={formData.name} onChange={handleChange} sx={inputStyle} fullWidth />
          <TextField label="Type" name="type" value={formData.type} onChange={handleChange} sx={inputStyle} fullWidth />
          <TextField label="Registration No" name="registration" value={formData.registration} onChange={handleChange} sx={inputStyle} fullWidth />
          <TextField label="Device ID" name="device_id" value={formData.device_id} onChange={handleChange} sx={inputStyle} fullWidth />
          <TextField label="Location" name="location" value={formData.location} onChange={handleChange} sx={inputStyle} fullWidth />

          {/* ---------- STATION (REPLACED WARD) ---------- */}
          <TextField
            select
            label="Station"
            name="station"
            value={formData.station || ""}
            onChange={handleChange}
            sx={inputStyle}
            fullWidth
          >
            {stations.map((st, i) => (
              <MenuItem key={i} value={st}>
                {st}
              </MenuItem>
            ))}
          </TextField>

          {/* ---------- STATUS ---------- */}
          <TextField
            select
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            sx={inputStyle}
            fullWidth
            className="sm:col-span-2"
            SelectProps={{
              MenuProps: {
                PaperProps: {
                  sx: {
                    background: "#151619",
                    color: "#fff",
                    "& .MuiMenuItem-root:hover": {
                      backgroundColor: "#ef444420",
                    },
                    "& .Mui-selected": {
                      backgroundColor: "#ef444430 !important",
                    },
                  },
                },
              },
            }}
          >
            <MenuItem value="available">Available</MenuItem>
            <MenuItem value="busy">Busy</MenuItem>
            <MenuItem value="en-route">En Route</MenuItem>
            <MenuItem value="maintenance">Maintenance</MenuItem>
          </TextField>
        </div>
      </DialogContent>

      {/* ---------- ACTIONS ---------- */}
      <DialogActions sx={{ borderTop: "1px solid #25262a", p: 2 }}>
        <Button onClick={onClose} sx={{ color: "#a1a1a1" }}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={saveChanges}
          type="button"
          sx={{
            background: "#ef4444",
            px: 4,
            "&:hover": {
              background: "#dc2626",
              boxShadow: "0 0 12px rgba(255,50,50,.5)",
            },
          }}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}
