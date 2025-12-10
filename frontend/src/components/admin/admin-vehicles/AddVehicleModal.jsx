import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";

export default function AddVehicleModal({ open, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    registrationNumber: "",
    deviceId: "",
    location: "",
    ward: "",
    status: "available",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSubmit(formData);
    setFormData({});
    onClose();
  };

  /* Unified input dark styling */
  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      background: "#151619",
      color: "#e3e3e3",
      borderRadius: "10px",
      "& fieldset": { borderColor: "#2a2b2e" },
      "&:hover fieldset": { borderColor: "#3b82f6" },
      "&.Mui-focused fieldset": {
        borderColor: "#3b82f6",
        boxShadow: "0 0 6px rgba(59,130,246,.6)",
      },
    },
    "& label": { color: "#9ea2a7" },
    "& label.Mui-focused": { color: "#3b82f6" },
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
          boxShadow: "0 0 18px rgba(0,0,0,.6)",
        },
      }}
    >
      {/* HEADER */}
      <DialogTitle
        sx={{
          color: "#fff",
          borderBottom: "1px solid #25262a",
          pb: 2,
          fontWeight: 600,
        }}
      >
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
          Add New Vehicle
        </span>
      </DialogTitle>

      {/*  GRID INPUT FORM ⚡ */}
      <DialogContent sx={{ py: 3 }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          <TextField
            label="Vehicle Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            sx={inputStyle}
            fullWidth
          />
          <TextField
            label="Vehicle Type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            sx={inputStyle}
            fullWidth
          />

          <TextField
            label="Registration No."
            name="registrationNumber"
            value={formData.registrationNumber}
            onChange={handleChange}
            sx={inputStyle}
            fullWidth
          />
          <TextField
            label="VTS Device ID"
            name="deviceId"
            value={formData.deviceId}
            onChange={handleChange}
            sx={inputStyle}
            fullWidth
          />

          <TextField
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            sx={inputStyle}
            fullWidth
          />
          <TextField
            label="Ward"
            name="ward"
            value={formData.ward}
            onChange={handleChange}
            sx={inputStyle}
            fullWidth
          />

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
                    background: "#151619", // Dark dropdown background
                    color: "#e3e3e3", // Text white
                    border: "1px solid #2a2b2e",
                    borderRadius: "10px",
                    boxShadow: "0 0 12px rgba(0,0,0,0.7)",
                  },
                },
              },
            }}
          >
            <MenuItem value="available" sx={{ color: "#9ae6b4" }}>
              Available
            </MenuItem>
            <MenuItem value="busy" sx={{ color: "#f6d860" }}>
              Busy
            </MenuItem>
            <MenuItem value="en-route" sx={{ color: "#60a5fa" }}>
              En Route
            </MenuItem>
            <MenuItem value="maintenance" sx={{ color: "#fb7185" }}>
              Maintenance
            </MenuItem>
          </TextField>
        </div>
      </DialogContent>

      {/* FOOTER */}
      <DialogActions sx={{ borderTop: "1px solid #25262a", p: 2.5 }}>
        <Button
          onClick={onClose}
          sx={{
            color: "#9ea2a7",
            border: "1px solid #2a2c31",
            px: 3,
            borderRadius: "8px",
            "&:hover": { background: "#1c1d20", borderColor: "#444" },
          }}
        >
          Cancel
        </Button>

        <Button
          onClick={handleSave}
          sx={{
            background: "#ef4444",
            px: 4,
            fontWeight: 600,
            borderRadius: "8px",
            "&:hover": {
              background: "#dc2626",
              boxShadow: "0 0 10px rgba(239,68,68,.5)",
            },
          }}
          variant="contained"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
