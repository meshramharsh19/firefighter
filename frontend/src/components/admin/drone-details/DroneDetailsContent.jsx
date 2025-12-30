"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import SafeIcon from "@/components/common/SafeIcon";
import StatusBadge from "@/components/common/StatusBadge";

import { MOCK_DRONES, MOCK_DRONE_LOGS } from "@/data/DroneData";
import { MOCK_USERS } from "@/data/UserData";

import { useMap, MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

import { toast } from "react-hot-toast";

const showError = (msg) => toast.error(msg);

export default function DroneDetailsContent() {
  const [selectedDrones] = useState(MOCK_DRONES[0]);

  const [drones, setDrones] = useState([]);
  const [stations, setstations] = useState([]);
  const [selectedstation, setSelectedstation] = useState("");
  const [selectedDrone, setselectedDrone] = useState(null);
  const [gpsLocation, setGpsLocation] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  const [selectedPilot, setSelectedPilot] = useState(null);
  const [showAssignButton, setShowAssignButton] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editDrone, setEditDrone] = useState({
    flight_hours: "",
    health_status: "",
    firmware_version: "",
    status: "",
  });

  const defaultPune = { lat: 18.5204, lng: 73.8567 };

  const API = "http://localhost/fire-fighter-new/backend/controllers/drones";

  useEffect(() => {
    fetch(`${API}/getstations.php`)
      .then((res) => res.json())
      .then((data) => setstations(data));
  }, []);

  const fetchDronesBystation = (station) => {
    fetch(`${API}/getDronesBystation.php?station=${station}`)
      .then((res) => res.json())
      .then((data) => {
        setDrones(data);
        if (data.length) setselectedDrone(data[0]);
      });
  };

  const fetchDroneDetails = (code) => {
    fetch(`${API}/getDroneDetails.php?drone_code=${code}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status !== false) {
          setselectedDrone(data);
        }
      });
  };

  const updateDroneDetails = () => {
    const formData = new FormData();
    formData.append("drone_code", selectedDrone.drone_code);
    formData.append("flight_hours", editDrone.flight_hours);
    formData.append("health_status", editDrone.health_status);
    formData.append("firmware_version", editDrone.firmware_version);
    formData.append("status", editDrone.status);

    fetch(`${API}/updateDroneDetails.php`, {
      method: "POST",
      credentials: "include",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("Drone updated successfully");
          setShowEditDialog(false);
          fetchDroneDetails(selectedDrone.drone_code); // refresh UI
        } else {
          toast.error("Failed to update drone");
        }
      })
      .catch(() => toast.error("Server error"));
  };

  const getHealthStatusColor = (status) => {
    switch (status) {
      case "Optimal":
        return "text-emerald-500";
      case "Degraded":
        return "text-amber-500";
      case "Requires Service":
        return "text-orange-500";
      default:
        return "text-muted-foreground";
    }
  };

  const getHealthStatusBg = (status) => {
    switch (status) {
      case "optimal":
        return "bg-emerald-500/10";
      case "degraded":
        return "bg-amber-500/10";
      case "requires service":
        return "bg-orange-500/10";
      default:
        return "bg-muted";
    }
  };


  const getStatusVariant = (status) => {
    switch (status) {
      case "patrolling":
        return "available";
      case "active_mission":
        return "busy";
      case "standby":
        return "warning";
      case "offline":
        return "offline";
      default:
        return "offline";
    }
  };

  // const getPilotStatusStyles = (status) => {
  //   switch (status) {
  //     case "available":
  //       return "bg-[#009966] text-[#FAFAFA] border border-emerald-500/40";
  //     case "assigned":
  //       return "bg-[#F54A00] text-[#FAFAFA] border border-red-500/40";
  //     default:
  //       return "bg-muted text-muted-foreground border border-muted";
  //   }
  // };

  const assignPilot = () => {
    if (!selectedPilot) {
      toast.error("Please select a pilot.");
      return;
    }

    const formData = new FormData();
    formData.append("drone_code", selectedDrone.drone_code);
    formData.append("pilot_id", selectedPilot.id);
    formData.append("pilot_name", selectedPilot.fullName);
    formData.append("pilot_email", selectedPilot.email);
    formData.append("pilot_phone", selectedPilot.phone);
    formData.append("pilot_role", selectedPilot.designation);

    // VERY IMPORTANT → Send old pilot ID
    formData.append("old_pilot_id", selectedDrone?.pilot_id || "");

    fetch(`${API}/assignPilotToDrone.php`, {
      method: "POST",
      credentials: "include",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("Pilot assigned successfully!");
          fetchDroneDetails(selectedDrone.drone_code);
        } else {
          toast.error(
            data.error || "Pilot is already assigned to another drone.",
          );
        }
      })
      .catch(() => {
        toast.error("Server error while assigning pilot.");
      });
  };

  const removePilot = () => {
    if (!selectedDrone) return;

    const formData = new FormData();
    formData.append("drone_code", selectedDrone.drone_code);
    formData.append("pilot_id", selectedDrone.pilot_id);

    fetch(`${API}/removePilotFromDrone.php`, {
      method: "POST",
      credentials: "include",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("Pilot removed successfully");
          fetchDroneDetails(selectedDrone.drone_code);
        } else {
          toast.error("Failed to remove pilot.");
        }
      });
  };

  useEffect(() => {
    if (!selectedDrone?.drone_code) return;

    // 🔁 First immediate fetch
    fetchDroneGps(selectedDrone.drone_code);

    // 🔁 Polling every 5 seconds
    const interval = setInterval(() => {
      fetchDroneGps(selectedDrone.drone_code);
    }, 5000); // 5 sec (change if needed)

    // 🧹 Cleanup when drone changes / component unmounts
    return () => clearInterval(interval);

  }, [selectedDrone?.drone_code]);


  const fetchDroneGps = (droneCode) => {
    fetch(`${API}/get_drone_locations.php?drone_code=${droneCode}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.lat && data.lng) {
          setGpsLocation({
            lat: data.lat,
            lng: data.lng
          });
        } else {
          setGpsLocation(null);
        }
      })
      .catch(() => {
        console.error("Failed to fetch GPS data");
        setGpsLocation(null);
      });
  };

  const droneIcon = new L.Icon({
    iconUrl: "assets/images/drone.png", // ✅ correct public path
    iconSize: [36, 36],                  // size adjust kar sakte ho
    iconAnchor: [18, 18],                // center anchor
    popupAnchor: [0, -18],
  });

  const [newDrone, setNewDrone] = useState({
    drone_code: "",
    drone_name: "",
    ward: "",
    status: "standby",
    battery: "",
    flight_hours: "",
    health_status: "Optimal",
    firmware_version: "",
    is_ready: 1,
    station: "",
  });

  const addDrone = () => {
    if (!isAddDroneFormValid()) {
      toast.error("Please fill all fields");
      return;
    }

    const formData = new FormData();
    Object.entries(newDrone).forEach(([k, v]) =>
      formData.append(k, v)
    );

    fetch(`${API}/addDrone.php`, {
      method: "POST",
      credentials: "include",
      body: formData,
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          toast.success("Drone added successfully");
          setShowAddDialog(false);
          fetchDronesBystation(newDrone.station);
        } else {
          toast.error(data.error);
        }
      });
  };


  const isAddDroneFormValid = () => {
    const {
      drone_code,
      drone_name,
      ward,
      status,
      battery,
      flight_hours,
      health_status,
      firmware_version,
      station,
    } = newDrone;

    return (
      drone_code.trim().length > 0 &&
      drone_name.trim().length > 0 &&
      ward.trim().length > 0 &&
      status.trim().length > 0 &&
      health_status.trim().length > 0 &&
      firmware_version.trim().length > 0 &&
      station.trim().length > 0 &&
      battery !== "" && battery >= 0 && battery <= 100 &&
      flight_hours !== ""
    );
  };

  const isEditDroneFormChanged = () => {
    if (!originalDrone) return false;

    return (
      Number(editDrone.flight_hours) !== Number(originalDrone.flight_hours) ||
      editDrone.health_status !== originalDrone.health_status ||
      editDrone.firmware_version.trim() !== originalDrone.firmware_version.trim() ||
      editDrone.status !== originalDrone.status
    );
  };

  const pilot = MOCK_USERS.find(
    (u) => u.id === selectedDrones.pilotAssigned.id,
  );


  return (
    <div className="space-y-6 p-6">
      {/* Dropdown Filters */}
      <div className="flex gap-6 items-end">
        {/* station Selector */}
        <div className="flex flex-col">
          <label className="text-md font-medium text-muted-foreground mb-2">
            Select station:
          </label>
          <select
            className="h-9 w-50 text-sm text-[#FAFAFA] px-3 rounded-md bg-[#0D0F12]
             border border-[#2E2E2E] hover:border-[#dc2626]
             focus:outline-none focus:ring-1 focus:ring-[#dc2626]
             transition disabled:opacity-40 disabled:cursor-not-allowed"
            value={selectedstation}
            onChange={(e) => {
              setSelectedstation(e.target.value);
              fetchDronesBystation(e.target.value);
            }}
          >
            <option value="" disabled>
              Select station
            </option>
            {stations.map((w, i) => (
              <option key={i} value={w}>
                {w}
              </option>
            ))}
          </select>
        </div>

        {/* Drone Selector */}
        <div className="flex flex-col">
          <label className="text-md font-medium text-muted-foreground mb-2">
            Select Drone:{" "}
          </label>
          <select
            className="h-9 w-50 text-sm text-[#FAFAFA] px-3 rounded-md bg-[#0D0F12] border border-[#2E2E2E] hover:border-[#dc2626] focus:outline-none focus:ring-1 focus:ring-[#dc2626] transition disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={!selectedstation}
            onChange={(e) => {
              fetchDroneDetails(e.target.value);
            }}
          >
            <option
              value=""
              disabled
              className="text-neutral-500 hover:border-[#dc2626]"
            >
              Select Drone
            </option>
            {drones.map((d, i) => (
              <option key={i} value={d.drone_code}>
                {d.drone_name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between">
        {/* LEFT SIDE */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                (window.location.href = "./admin-drone-monitoring.html")
              }
            >
              <SafeIcon name="ArrowLeft" size={20} />
            </Button>

            <h1 className="text-3xl font-bold">
              {selectedDrone?.drone_name}
            </h1>

            <StatusBadge
              status={getStatusVariant(selectedDrone?.status)}
              label={selectedDrone?.status}
            />
          </div>

          <p className="text-muted-foreground ml-[50px]">
            Serial: {selectedDrone?.drone_code}
          </p>
        </div>

        {/* RIGHT SIDE BUTTONS */}
        <div className="flex gap-3">
          {/* ADD DRONE */}
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => {
              setNewDrone({
                drone_code: "",
                drone_name: "",
                ward: "",
                status: "standby",
                battery: "",
                flight_hours: "",
                health_status: "Optimal",
                firmware_version: "",
                is_ready: 1,
                station: "",
              });
              setShowAddDialog(true);
            }}
          >
            <SafeIcon name="Plus" size={16} />
            Add Drone
          </Button>

          {/* EDIT DRONE */}
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => {
              if (!selectedDrone) {
                toast.error("Select drone first");
                return;
              }

              setEditDrone({
                flight_hours: selectedDrone.flight_hours ?? "",
                health_status: selectedDrone.health_status ?? "",
                firmware_version: selectedDrone.firmware_version ?? "",
                status: selectedDrone.status ?? "",
              });

              setShowEditDialog(true);
            }}
          >
            <SafeIcon name="Edit" size={16} />
            Edit Drone
          </Button>
        </div>
      </div>


      {/*Add Drone Dialog Box */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-lg bg-[#0D0F12] border border-[#2E2E2E] text-[#FAFAFA]">
          <DialogHeader>
            <DialogTitle>Add New Drone</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4">

            <InputField label="Drone Code" value={newDrone.drone_code}
              onChange={(v) => setNewDrone({ ...newDrone, drone_code: v })} />

            <InputField label="Drone Name" value={newDrone.drone_name}
              onChange={(v) => setNewDrone({ ...newDrone, drone_name: v })} />

            <InputField label="Ward" value={newDrone.ward}
              onChange={(v) => setNewDrone({ ...newDrone, ward: v })} />

            <InputField label="Battery (%)" type="number" value={newDrone.battery}
              onChange={(v) => {
                let value = Number(v);

                if (value > 100) {
                  toast.error("Battery cannot exceed 100%");
                  value = 100;
                }

                setNewDrone({ ...newDrone, battery: value });
              }} />

            <InputField label="Flight Hours" type="number" step="0.1"
              value={newDrone.flight_hours}
              onChange={(v) => setNewDrone({ ...newDrone, flight_hours: v })} />

            <InputField label="Firmware Version" value={newDrone.firmware_version}
              onChange={(v) => setNewDrone({ ...newDrone, firmware_version: v })} />

            {/* STATUS */}
            <SelectField label="Status" value={newDrone.status}
              options={["patrolling", "active_mission", "standby", "offline"]}
              onChange={(v) => setNewDrone({ ...newDrone, status: v })} />

            {/* HEALTH */}
            <SelectField label="Health Status" value={newDrone.health_status}
              options={["Optimal", "Degraded", "Requires Service"]}
              onChange={(v) => setNewDrone({ ...newDrone, health_status: v })} />

            {/* READY */}
            <SelectField label="Is Ready" value={newDrone.is_ready}
              options={[1, 0]}
              onChange={(v) => setNewDrone({ ...newDrone, is_ready: v })} />

            {/* STATION */}
            <SelectField label="Station" value={newDrone.station}
              options={stations}
              onChange={(v) => setNewDrone({ ...newDrone, station: v })} />
          </div>

          <Button
            disabled={!isAddDroneFormValid()}
            className="w-full bg-[#dc2626] hover:bg-[#b81f1f]
            disabled:opacity-40 disabled:cursor-not-allowed"
            onClick={addDrone}
          >
            Save Drone
          </Button>

        </DialogContent>
      </Dialog>
      {/*Edit Drone Details Dialog Box */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-md bg-[#0D0F12] border border-[#2E2E2E] text-[#FAFAFA]">
          <DialogHeader>
            <DialogTitle>Edit Drone Details</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Flight Hours */}
            <div>
              <label className="text-sm text-muted-foreground">
                Flight Hours
              </label>
              <input
                type="number"
                step="0.1"
                value={editDrone.flight_hours}
                onChange={(e) =>
                  setEditDrone({ ...editDrone, flight_hours: e.target.value })
                }
                className="w-full mt-1 h-9 rounded-md bg-[#0D0F12] border border-[#2E2E2E] px-3 
                hover:border-[#dc2626] focus:outline-none focus:ring-0 focus:border-[#dc2626]"
              />
            </div>

            {/* Health Status */}
            <div>
              <label className="text-sm text-muted-foreground">
                Health Status
              </label>
              <select
                value={editDrone.health_status}
                onChange={(e) =>
                  setEditDrone({ ...editDrone, health_status: e.target.value })
                }
                className="w-full mt-1 h-9 rounded-md bg-[#0D0F12] border border-[#2E2E2E] px-3
                hover:border-[#dc2626] focus:outline-none focus:ring-0 focus:border-[#dc2626]"
              >
                <option value="Optimal">Optimal</option>
                <option value="Degraded">Degraded</option>
                <option value="Requires Service">Requires Service</option>
              </select>
            </div>

            {/* Firmware */}
            <div>
              <label className="text-sm text-muted-foreground">
                Firmware Version
              </label>
              <input
                type="text"
                value={editDrone.firmware_version}
                onChange={(e) =>
                  setEditDrone({
                    ...editDrone,
                    firmware_version: e.target.value,
                  })
                }
                className="w-full mt-1 h-9 rounded-md bg-[#0D0F12] border border-[#2E2E2E] px-3
                hover:border-[#dc2626] focus:outline-none focus:ring-0 focus:border-[#dc2626]"
              />
            </div>

            {/* Status */}
            <div>
              <label className="text-sm text-muted-foreground">
                Drone Status
              </label>
              <select
                value={editDrone.status}
                onChange={(e) =>
                  setEditDrone({ ...editDrone, status: e.target.value })
                }
                className="w-full mt-1 h-9 rounded-md bg-[#0D0F12] border border-[#2E2E2E] px-3
                hover:border-[#dc2626] focus:outline-none focus:ring-0 focus:border-[#dc2626]"
              >
                <option value="patrolling">Patrolling</option>
                <option value="active_mission">Active Mission</option>
                <option value="standby">Standby</option>
                <option value="offline">Offline</option>
              </select>
            </div>

            {/* Save Button */}
            <Button
              className="w-full bg-[#dc2626] hover:bg-[#b81f1f]"
              onClick={updateDroneDetails}
            >
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Flight Hours */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Flight Hours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {selectedDrone?.flight_hours
                ? Number(selectedDrone.flight_hours).toFixed(1) + "h"
                : "-"}
            </div>
            <p className="text-xs text-muted-foreground">
              Total operational time
            </p>
          </CardContent>
        </Card>

        {/* Health Status */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Health Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${getHealthStatusColor(selectedDrone?.health_status)}`}
            >
              {selectedDrone?.health_status === "Optimal" ? "✓" : "⚠"}
            </div>
            <p className="text-xs text-muted-foreground">
              {selectedDrone?.health_status ?? "-"}
            </p>
          </CardContent>
        </Card>

        {/* Firmware */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Firmware
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {selectedDrone?.firmware_version ?? "-"}
            </div>
            <p className="text-xs text-muted-foreground">Latest available</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="history">Flight History</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>

        {/* Overview */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Drone Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Drone Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Info
                    label="Serial Number"
                    value={selectedDrone?.drone_code}
                  />
                  <Info
                    label="station Allocation"
                    value={selectedDrone?.station}
                  />
                  <Info
                    label="Firmware Version"
                    value={selectedDrone?.firmware_version}
                  />
                  <Info
                    label="Last Maintenance"
                    value={selectedDrones.lastMaintenanceDate}
                  />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Current Status
                    </span>
                    <StatusBadge
                      status={getStatusVariant(selectedDrone?.status)}
                      label={selectedDrone?.status}
                      showIcon={false}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pilot */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Assigned Pilot</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                {selectedDrone?.pilot_id ? (
                  <>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 bg-[#261810] border border-[#dc2626]">
                        <AvatarFallback className="text-[#dc2626] ">
                          {selectedDrone.pilot_name[0]}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <p className="font-medium">
                          {selectedDrone.pilot_name}
                        </p>
                        <p className="text-muted-foreground text-sm">
                          {selectedDrone.pilot_role}
                        </p>
                      </div>
                    </div>

                    <Info
                      label="Email"
                      value={selectedDrone.pilot_email}
                      isSmall
                    />
                    <Info
                      label="Phone"
                      value={selectedDrone.pilot_phone}
                      isSmall
                    />
                    <Info
                      label="Phone"
                      value={selectedDrone.pilot_phone}
                      isSmall
                    />

                    {/* Pilot Status UI */}
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-muted-foreground text-sm">
                        Pilot Status
                      </span>

                      <span
                        className={`px-2 py-1 rounded-md text-xs font-medium bg-[#dc2626] text-[#FAFAFA] border border-[#dc2626] ${selectedDrone.pilot_status}`}
                      >
                        {selectedDrone.pilot_status}
                      </span>
                    </div>

                    <div className="flex gap-3">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="w-full">
                            Reassign Pilot
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md bg-[#0D0F12] border border-[#2E2E2E] text-[#FAFAFA]">
                          <DialogHeader>
                            <DialogTitle className="text-lg font-semibold">
                              Select Pilot ({selectedDrone?.station})
                            </DialogTitle>
                          </DialogHeader>

                          {/* Pilot List */}
                          <div className="mt-2">
                            <PilotList
                              station={selectedDrone?.station}
                              selectedPilot={selectedPilot}
                              setSelectedPilot={setSelectedPilot}
                            />
                          </div>

                          {/* Assign Button */}
                          <Button
                            variant="outline"
                            disabled={!selectedPilot}
                            onClick={assignPilot}
                            className="w-full mt-4 disabled:opacity-40 disabled:cursor-not-allowed "
                          >
                            Assign Pilot
                          </Button>
                        </DialogContent>
                      </Dialog>

                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={removePilot}
                      >
                        Remove Pilot
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <SafeIcon
                      name="AlertCircle"
                      size={32}
                      className="mx-auto text-muted-foreground"
                    />
                    <p className="text-muted-foreground">No pilot assigned</p>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="mt-4 gap-2">
                          <SafeIcon name="Plus" size={16} />
                          Assign Pilot
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="max-w-md bg-[#0D0F12] border-[#2E2E2E] text-[#FAFAFA]">
                        <DialogHeader>
                          <DialogTitle className="text-lg font-semibold">
                            Select Pilot ({selectedDrone?.station})
                          </DialogTitle>
                        </DialogHeader>

                        {/* --- PILOT LIST --- */}
                        <PilotList
                          station={selectedDrone?.station}
                          selectedPilot={selectedPilot}
                          setSelectedPilot={setSelectedPilot}
                        />

                        {/* --- STEP 3 BUTTON GOES HERE --- */}
                        <Button
                          variant="outline"
                          disabled={!selectedPilot}
                          onClick={assignPilot}
                          className="w-full mt-4 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          Assign Pilot
                        </Button>
                      </DialogContent>
                    </Dialog>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Location */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">

                {/* 2D Live Map */}
                <div className="aspect-video overflow-hidden rounded-lg border border-neutral-700">
                  <MapContainer
                    center={[
                      gpsLocation?.lat || defaultPune.lat,
                      gpsLocation?.lng || defaultPune.lng
                    ]}
                    zoom={13}
                    scrollWheelZoom
                    style={{ height: "100%", width: "100%" }}
                  >
                    <TileLayer
                      attribution="&copy; OpenStreetMap contributors"
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <FlyToLocation gpsLocation={gpsLocation} />

                    {gpsLocation && (
                      <Marker
                        position={[gpsLocation.lat, gpsLocation.lng]}
                        icon={droneIcon}
                      >
                        <Popup>
                          <b>{selectedDrone?.drone_name}</b><br />
                          Lat: {gpsLocation.lat.toFixed(5)}<br />
                          Lng: {gpsLocation.lng.toFixed(5)}
                        </Popup>
                      </Marker>
                    )}
                  </MapContainer>
                </div>

                {/* Coordinates */}
                <div className="grid grid-cols-2 gap-4">
                  <Info
                    label="Latitude"
                    value={gpsLocation ? gpsLocation.lat.toFixed(6) : "–"}
                  />
                  <Info
                    label="Longitude"
                    value={gpsLocation ? gpsLocation.lng.toFixed(6) : "–"}
                  />
                </div>

              </div>
            </CardContent>
          </Card>

        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Flight History</CardTitle>
              <CardDescription>Recent flights and missions</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                {MOCK_DRONE_LOGS.map((log, idx) => (
                  <LogItem key={idx} log={log} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Maintenance Tab */}
        <TabsContent value="maintenance" className="space-y-4">
          <MaintenanceSection
            selectedDrones={selectedDrones}
            selectedDrone={selectedDrone}
            getHealthStatusBg={getHealthStatusBg}
            getHealthStatusColor={getHealthStatusColor}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}



function FlyToLocation({ gpsLocation }) {
  const map = useMap();
  useEffect(() => {
    if (gpsLocation) {
      map.flyTo([gpsLocation.lat, gpsLocation.lng], map.getZoom(), {
        animate: true,
        duration: 1.5,
      });
    }
  }, [gpsLocation]);
  return null;
}

function Info({ label, value, isSmall }) {
  return (
    <div className="flex justify-between">
      <span className={`text-muted-foreground ${isSmall ? "text-sm" : ""}`}>
        {label}
      </span>
      <span className={`font-medium ${isSmall ? "text-sm" : ""}`}>{value}</span>
    </div>
  );
}

function LogItem({ log }) {
  return (
    <div className="flex gap-4 pb-4 border-b last:border-0 last:pb-0">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted flex-shrink-0">
        <SafeIcon name="Plane" size={20} className="text-primary" />
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <p className="font-medium">{log.activity}</p>
          <span className="text-xs text-muted-foreground">
            {new Date(log.timestamp).toLocaleDateString()}{" "}
            {new Date(log.timestamp).toLocaleTimeString()}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">Pilot: {log.pilotName}</p>
        <p className="text-sm text-muted-foreground">{log.notes}</p>
      </div>
    </div>
  );
}

const normalizeStatus = (status) =>
  status
    ?.toLowerCase()
    .replace(/[_-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

function MaintenanceSection({
  selectedDrones,
  selectedDrone,
  getHealthStatusBg,
  getHealthStatusColor,
}) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Maintenance History</CardTitle>
          <CardDescription>
            Service records and maintenance logs
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            className={`rounded-lg p-4 ${getHealthStatusBg(normalizeStatus(selectedDrone?.health_status))}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Health Status</p>
                <p
                  className={`text-sm ${getHealthStatusColor(normalizeStatus(selectedDrone?.health_status))}`}
                >
                  {selectedDrone?.health_status}
                </p>
              </div>
              <SafeIcon
                name={
                  selectedDrone?.health_status === "Optimal"
                    ? "CheckCircle2"
                    : "AlertTriangle"
                }
                size={24}
                className={getHealthStatusColor(selectedDrone?.health_status)}
              />
            </div>
          </div>

          <Info
            label="Last Maintenance Date"
            value={selectedDrones.lastMaintenanceDate}
          />
          <Info
            label="Total Flight Hours"
            value={`${Number(selectedDrone?.flight_hours).toFixed(1)} hours`}
          />
          <Info label="Next Service Due" value="2025-12-15" />

          <Button variant="outline" className="w-full gap-2">
            <SafeIcon name="Wrench" size={16} />
            Schedule Maintenance
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Maintenance Records</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { title: "Battery Replacement", date: "2025-11-01" },
            { title: "Sensor Calibration", date: "2025-10-15" },
            { title: "Propeller Inspection", date: "2025-09-20" },
          ].map((rec, idx) => (
            <div key={idx} className="flex gap-3 pb-3 border-b last:border-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                <SafeIcon name="Wrench" size={16} className="text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">{rec.title}</p>
                <p className="text-xs text-muted-foreground">{rec.date}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
}

function PilotList({ station, selectedPilot, setSelectedPilot }) {
  const [pilots, setPilots] = useState([]);

  useEffect(() => {
    if (station) {
      fetch(
        `http://localhost/fire-fighter-new/backend/controllers/drones/getPilotsByStation.php?station=${station}`,
      )
        .then((res) => res.json())
        .then((data) => setPilots(data));
    }
  }, [station]);

  const handlePilotClick = (p) => {
    setSelectedPilot(p);
  };

  const getPilotStatusBadge = (status) => {
    if (status == "assigned") {
      return "bg-red-600/20 text-red-500 border border-red-500/40";
    }
    return "bg-emerald-600/20 text-emerald-500 border border-emerald-500/40";
  };

  return (
    <div className="space-y-3 max-h-64 overflow-y-auto">
      {pilots.map((p) => {
        return (
          <div
            key={p.id}
            onClick={() => handlePilotClick(p)}
            className={`
              flex justify-between items-center p-3 border rounded-lg transition
              ${p.pilot_status === "assigned"
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer hover:bg-[#241510] hover:border-[#dc2626]"
              }
              ${selectedPilot?.id === p.id
                ? "border-[#dc2626] bg-[#241510]"
                : "border-[#2E2E2E]"
              }
            `}
          >
            {/* LEFT SIDE – PILOT INFO */}
            <div>
              <p className="font-medium">{p.fullName}</p>
              <p className="text-xs text-muted-foreground">{p.designation}</p>
              <p className="text-xs text-muted-foreground">{p.phone}</p>
            </div>

            {/* RIGHT SIDE – PILOT STATUS BADGE */}
            <span
              className={`px-2 py-1 text-xs rounded-md font-medium ${getPilotStatusBadge(p.pilot_status)}`}
            >
              {p.pilot_status}
            </span>
          </div>
        );
      })}

      {pilots.length === 0 && (
        <p className="text-center text-muted-foreground text-sm py-2">
          No pilots found in this station
        </p>
      )}
    </div>
  );
}

function InputField({ label, value, onChange, type = "text", step }) {
  return (
    <div>
      <label className="text-sm text-muted-foreground">{label}</label>
      <input
        type={type}
        min="0"
        max="100"
        step="1"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-1 h-9 rounded-md bg-[#0D0F12] border border-[#2E2E2E]
        px-3 hover:border-[#dc2626] focus:outline-none focus:border-[#dc2626]"
      />
    </div>
  );
}

function SelectField({ label, value, options, onChange }) {
  return (
    <div>
      <label className="text-sm text-muted-foreground">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-1 h-9 rounded-md bg-[#0D0F12] border border-[#2E2E2E]
        px-3 hover:border-[#dc2626]"
      >
        <option value="">Select {label}</option>
        {options.map((o, i) => (
          <option key={i} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}








