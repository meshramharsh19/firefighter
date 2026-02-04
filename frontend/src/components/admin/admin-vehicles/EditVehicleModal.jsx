import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";

export default function EditVehicleModal({
  open,
  onClose,
  vehicle,
  onUpdate,
  stations = [],
}) {
  const [formData, setFormData] = useState(null);
  const [isDirty, setIsDirty] = useState(false);
  const [error, setError] = useState("");

  const originalRef = useRef(null);

  /* ---------- SET DATA ON OPEN ---------- */
  useEffect(() => {
    if (!vehicle) return;

    const safeVehicle = {
      ...vehicle,
      station: vehicle.station || "",
    };

    setFormData(safeVehicle);
    originalRef.current = JSON.stringify(safeVehicle);
    setIsDirty(false);
    setError("");
  }, [vehicle]);

  if (!formData) return null;

  /* ---------- CHANGE HANDLER ---------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };

    setFormData(updated);
    setError("");
    setIsDirty(JSON.stringify(updated) !== originalRef.current);
  };

  /* ---------- SAVE ---------- */
  const saveChanges = async () => {
    if (!isDirty) return;

    const res = await onUpdate(formData);

    if (!res?.success) {
      setError(res?.message || "Update failed");
      return;
    }

    onClose();
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
      "&.Mui-disabled": {
        background: "#101114",
        color: "#777",
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
      {/* TITLE */}
      <DialogTitle
        sx={{ borderBottom: "1px solid #25262a", pb: 2, fontWeight: 600 }}
      >
        ✏ Edit Vehicle -{" "}
        <span style={{ color: "#ef4444" }}>{formData.name}</span>
      </DialogTitle>

      <DialogContent sx={{ py: 2 }}>
        {error && (
          <div
            style={{
              marginBottom: "14px",
              padding: "10px 14px",
              borderRadius: "8px",
              background: "rgba(239,68,68,0.12)",
              border: "1px solid rgba(239,68,68,0.6)",
              color: "#ef4444",
              fontWeight: 600,
            }}
          >
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          <TextField label="Vehicle Name" name="name" value={formData.name} onChange={handleChange} sx={inputStyle} fullWidth />
          <TextField label="Type" name="type" value={formData.type} onChange={handleChange} sx={inputStyle} fullWidth />

          <TextField label="Registration No" name="registration" value={formData.registration} sx={inputStyle} fullWidth disabled />

          <TextField label="Device ID" name="device_id" value={formData.device_id} onChange={handleChange} sx={inputStyle} fullWidth />
          <TextField label="Location" name="location" value={formData.location} onChange={handleChange} sx={inputStyle} fullWidth />

          {/* 🔥 STATION DROPDOWN FIXED */}
          <TextField
            select
            label="Station"
            name="station"
            value={formData.station}
            onChange={handleChange}
            sx={inputStyle}
            fullWidth
          >
            {(Array.isArray(stations) ? stations : []).map((st, i) => {
              const name = typeof st === "string" ? st : st.name;
              const key = typeof st === "string" ? i : st.id;

              return (
                <MenuItem key={key} value={name}>
                  {name}
                </MenuItem>
              );
            })}
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

      <DialogActions sx={{ borderTop: "1px solid #25262a", p: 2 }}>
        <Button onClick={onClose} sx={{ color: "#a1a1a1" }}>Cancel</Button>

        <Button
          variant="contained"
          onClick={saveChanges}
          disabled={!isDirty}
          sx={{
            background: isDirty ? "#ef4444" : "#444",
            px: 4,
            cursor: isDirty ? "pointer" : "not-allowed",
            "&:hover": { background: isDirty ? "#dc2626" : "#444" },
          }}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}
