import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";

const STATION_API =
  "http://localhost/fire-fighter-new/backend/controllers/vehicle/getStations.php";

export default function AddVehicleModal({ open, onClose, onSubmit }) {
  const [stations, setStations] = useState([]);
  const [saving, setSaving] = useState(false); // 🔒 prevent double submit

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    registrationNumber: "",
    deviceId: "",
    location: "",
    station: "",
    status: "available",
  });

  /* ---------- Fetch Stations ---------- */
  useEffect(() => {
    if (!open) return;

    fetch(STATION_API)
      .then((res) => res.json())
      .then((data) => setStations(data || []))
      .catch((err) => console.error("❌ Station fetch error:", err));
  }, [open]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (saving) return; // 🔥 BLOCK DOUBLE CLICK
    setSaving(true);

    try {
      await onSubmit(formData);
    } finally {
      setSaving(false);
      setFormData({
        name: "",
        type: "",
        registrationNumber: "",
        deviceId: "",
        location: "",
        station: "",
        status: "available",
      });
      onClose();
    }
  };

  /* 🔴 BLACK + RED INPUT STYLE (UNCHANGED) */
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
    "& .MuiSvgIcon-root": { color: "#9ea2a7" },
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
          border: "1px solid #1d1e21",
          color: "#e5e7eb",
          borderRadius: "14px",
        },
      }}
    >
      <DialogTitle
        sx={{
          color: "#fff",
          borderBottom: "1px solid #25262a",
          pb: 2,
          fontWeight: 600,
        }}
      >
        Add New Vehicle
      </DialogTitle>

      <DialogContent sx={{ py: 3 }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          <TextField label="Vehicle Name" name="name" value={formData.name} onChange={handleChange} sx={inputStyle} fullWidth />
          <TextField label="Vehicle Type" name="type" value={formData.type} onChange={handleChange} sx={inputStyle} fullWidth />
          <TextField label="Registration No." name="registrationNumber" value={formData.registrationNumber} onChange={handleChange} sx={inputStyle} fullWidth />
          <TextField label="VTS Device ID" name="deviceId" value={formData.deviceId} onChange={handleChange} sx={inputStyle} fullWidth />
          <TextField label="Location" name="location" value={formData.location} onChange={handleChange} sx={inputStyle} fullWidth />

          {/* STATION */}
          <TextField select label="Station" name="station" value={formData.station} onChange={handleChange} sx={inputStyle} fullWidth>
            {stations.map((st, i) => (
              <MenuItem key={i} value={st}>
                {st}
              </MenuItem>
            ))}
          </TextField>

          {/* STATUS */}
          <TextField
            select
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            sx={inputStyle}
            fullWidth
            className="sm:col-span-2"
          >
            <MenuItem value="available">Available</MenuItem>
            <MenuItem value="busy">Busy</MenuItem>
            <MenuItem value="en-route">En Route</MenuItem>
            <MenuItem value="maintenance">Maintenance</MenuItem>
          </TextField>
        </div>
      </DialogContent>

      <DialogActions sx={{ borderTop: "1px solid #25262a", p: 2.5 }}>
        <Button onClick={onClose} sx={{ color: "#9ea2a7" }}>
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          type="button"              // 🔥 VERY IMPORTANT
          disabled={saving}
          variant="contained"
          sx={{ background: "#ef4444" }}
        >
          {saving ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
