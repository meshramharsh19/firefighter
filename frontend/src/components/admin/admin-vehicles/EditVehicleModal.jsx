import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, Button } from "@mui/material";

export default function EditVehicleModal({ open, onClose, vehicle, onUpdate }) {

  const [formData, setFormData] = useState(vehicle);

  useEffect(() => {
    setFormData(vehicle);
  }, [vehicle]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔥 fixed — now calling onUpdate instead of onSave
  const saveChanges = () => {
    if(onUpdate) onUpdate(formData);
    onClose();
  };

  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      background:"#151619", color:"#e3e3e3", borderRadius:"10px",
      "& fieldset":{ borderColor:"#2a2b2e" },
      "&:hover fieldset":{ borderColor:"#3b82f6" },
      "&.Mui-focused fieldset":{ borderColor:"#3b82f6", boxShadow:"0 0 6px rgba(59,130,246,.6)" }
    },
    "& label":{ color:"#9ea2a7" },
    "& label.Mui-focused":{ color:"#3b82f6" },
  };

  if (!formData) return null;

  return(
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm"
      PaperProps={{
        sx:{
          background:"#111214", color:"#fff", borderRadius:"14px",
          border:"1px solid #1d1e21", boxShadow:"0 0 18px rgba(0,0,0,.6)"
        }
      }}>

      <DialogTitle sx={{borderBottom:"1px solid #25262a",pb:2,fontWeight:600}}>
        ✏ Edit Vehicle - <span className="text-blue-400">{formData?.name}</span>
      </DialogTitle>

      <DialogContent sx={{py:3}}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          
          <TextField label="Vehicle Name" name="name" value={formData.name} onChange={handleChange} sx={inputStyle} fullWidth />
          <TextField label="Type" name="type" value={formData.type} onChange={handleChange} sx={inputStyle} fullWidth />
          <TextField label="Registration No" name="registration" value={formData.registration} onChange={handleChange} sx={inputStyle} fullWidth />
          <TextField label="Device ID" name="device_id" value={formData.device_id} onChange={handleChange} sx={inputStyle} fullWidth />
          <TextField label="Location" name="location" value={formData.location} onChange={handleChange} sx={inputStyle} fullWidth />
          <TextField label="Ward" name="ward" value={formData.ward} onChange={handleChange} sx={inputStyle} fullWidth />

          <TextField select label="Status" name="status" value={formData.status}
            onChange={handleChange} sx={inputStyle} fullWidth className="sm:col-span-2"
            SelectProps={{ MenuProps:{ PaperProps:{ sx:{background:"#151619",color:"#fff"} } } }}
          >
            <MenuItem value="available">Available</MenuItem>
            <MenuItem value="busy">Busy</MenuItem>
            <MenuItem value="en-route">En Route</MenuItem>
            <MenuItem value="maintenance">Maintenance</MenuItem>
          </TextField>
        </div>
      </DialogContent>

      <DialogActions sx={{borderTop:"1px solid #25262a",p:2}}>
        <Button onClick={onClose} sx={{color:"#a1a1a1"}}>Cancel</Button>
        <Button
          variant="contained"
          onClick={saveChanges}
          sx={{
            background:"#ef4444",px:4,
            "&:hover":{background:"#dc2626",boxShadow:"0 0 12px rgba(255,50,50,.5)"}
          }}
        >
          Update
        </Button>
      </DialogActions>

    </Dialog>
  );
}
