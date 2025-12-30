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
import toast from "react-hot-toast";

const STATION_API =
  "http://localhost/fire-fighter-new/backend/controllers/admin/admin-vehicle/getStations.php";

/* ---------- VALIDATORS ---------- */
const isAlphaSpace = (v) => /^[A-Za-z\s]*$/.test(v);
const isAlphaNumeric = (v) => /^[A-Za-z0-9\-]*$/.test(v);

export default function AddVehicleModal({ open, onClose, onSubmit }) {
  const [stations, setStations] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    registrationNumber: "",
    deviceId: "",
    location: "",
    station: "",
    status: "available",
  });

  /* ---------- RESET FORM ---------- */
  const resetForm = () => {
    setError("");
    setFormData({
      name: "",
      type: "",
      registrationNumber: "",
      deviceId: "",
      location: "",
      station: "",
      status: "available",
    });
  };

  /* ---------- Fetch Stations ---------- */
  useEffect(() => {
    if (!open) return;

    resetForm();

    fetch(STATION_API)
      .then((res) => res.json())
      .then((data) => setStations(data || []))
      .catch(() => {
        setError("Failed to load stations");
      });
  }, [open]);

  /* ---------- LIVE VALIDATION ---------- */
  const handleChange = (e) => {
    const { name, value } = e.target;

    if ((name === "name" || name === "type") && !isAlphaSpace(value)) {
      setError("Vehicle Name & Type must contain only letters");
      return;
    }

    if (
      (name === "registrationNumber" || name === "deviceId") &&
      !isAlphaNumeric(value)
    ) {
      setError("Registration & Device ID must be alphanumeric");
      return;
    }

    setError("");
    setFormData({ ...formData, [name]: value });
  };

  /* ---------- SAVE ---------- */
  const handleSave = async () => {
    if (saving) return;

    const { name, type, registrationNumber, deviceId, station } = formData;

    if (!name || !type || !registrationNumber || !deviceId || !station) {
      setError("Please fill all required fields");
      return;
    }

    setSaving(true);
    try {
      const res = await onSubmit(formData);

      if (!res?.success) {
        setError(res?.message || "Failed to add vehicle");
        return;
      }

      toast.success(res.message || "Vehicle added successfully");
      resetForm();
      onClose();
    } catch {
      setError("Server error");
    } finally {
      setSaving(false);
    }
  };

  /* ---------- INPUT STYLE ---------- */
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
      onClose={() => {
        resetForm();
        onClose();
      }}
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
      <DialogTitle sx={{ color: "#fff", fontWeight: 600 }}>
        Add New Vehicle
      </DialogTitle>

      <DialogContent sx={{ py: 2 }}>
        {/* 🔴 FORM TOP ERROR */}
        {error && (
          <div className="mb-3 text-lg text-red-500 font-medium">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          <TextField label="Vehicle Name *" name="name" value={formData.name} onChange={handleChange} sx={inputStyle} fullWidth />
          <TextField label="Vehicle Type *" name="type" value={formData.type} onChange={handleChange} sx={inputStyle} fullWidth />
          <TextField label="Registration No. *" name="registrationNumber" value={formData.registrationNumber} onChange={handleChange} sx={inputStyle} fullWidth />
          <TextField label="VTS Device ID *" name="deviceId" value={formData.deviceId} onChange={handleChange} sx={inputStyle} fullWidth />
          <TextField label="Location" name="location" value={formData.location} onChange={handleChange} sx={inputStyle} fullWidth />

          <TextField
            select
            label="Station *"
            name="station"
            value={formData.station}
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

      <DialogActions sx={{ p: 2 }}>
        <Button
          onClick={() => {
            resetForm();
            onClose();
          }}
          sx={{ color: "#9ea2a7" }}
        >
          Cancel
        </Button>

        <Button
          onClick={handleSave}
          disabled={saving || !!error}
          variant="contained"
          sx={{ background: "#ef4444" }}
        >
          {saving ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
