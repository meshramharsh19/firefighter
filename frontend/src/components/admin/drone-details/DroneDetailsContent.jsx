"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Fragment Imports
import DroneHeader from "./DroneHeader";
import QuickStats from "./QuickStats";
import OverviewTab from "./OverviewTab";
import HistoryTab from "./HistoryTab";
import MaintenanceTab from "./MaintenanceTab";
import AddDroneDialog from "./AddDroneDialog";
import EditDroneDialog from "./EditDroneDialog";

const API_BASE = import.meta.env.VITE_API_BASE_URL;
const API = `${API_BASE}/admin/admin-drone-details`;

export default function DroneDetailsContent() {
  const [stations, setStations] = useState([]);
  const [drones, setDrones] = useState([]);
  const [selectedStation, setSelectedStation] = useState("");
  const [selectedDrone, setSelectedDrone] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  
  // Dialog States
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  useEffect(() => {
    fetch(`${API}/getStations.php`)
      .then((res) => res.json())
      .then((data) => {
        setStations(data);
        if (data.length) {
          setSelectedStation(data[0]);
          fetchDronesByStation(data[0]);
        }
      });
  }, []);

  const fetchDronesByStation = (station) => {
    fetch(`${API}/getDronesByStation.php?station=${station}`)
      .then((res) => res.json())
      .then((data) => {
        setDrones(data);
        if (data.length) {
          fetchDroneDetails(data[0].drone_code);
        }
      });
  };

  const fetchDroneDetails = (code) => {
    fetch(`${API}/getDroneDetails.php?drone_code=${code}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status !== false) setSelectedDrone(data);
      });
  };

  return (
    <div className="space-y-6 p-6">
      {/* Station & Drone Selectors */}
      <div className="flex gap-6 items-end">
        <div className="flex flex-col">
          <label className="text-md font-medium text-muted-foreground mb-2">Select station:</label>
          <select 
            className="h-9 w-50 text-sm text-[#FAFAFA] px-3 rounded-md bg-[#0D0F12] border border-[#2E2E2E]"
            value={selectedStation} 
            onChange={(e) => {
              setSelectedStation(e.target.value);
              fetchDronesByStation(e.target.value);
            }}
          >
            {stations.map((s, i) => <option key={i} value={s}>{s}</option>)}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-md font-medium text-muted-foreground mb-2">Select Drone:</label>
          <select 
            className="h-9 w-50 text-sm text-[#FAFAFA] px-3 rounded-md bg-[#0D0F12] border border-[#2E2E2E]"
            value={selectedDrone?.drone_code || ""} 
            onChange={(e) => fetchDroneDetails(e.target.value)}
          >
            {drones.map((d, i) => <option key={i} value={d.drone_code}>{d.drone_name}</option>)}
          </select>
        </div>
      </div>

      <DroneHeader 
        selectedDrone={selectedDrone} 
        onAddClick={() => setShowAddDialog(true)} 
        onEditClick={() => setShowEditDialog(true)} 
      />

      <QuickStats selectedDrone={selectedDrone} />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="history">Flight History</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab selectedDrone={selectedDrone} refreshDrone={() => fetchDroneDetails(selectedDrone.drone_code)} />
        </TabsContent>

        <TabsContent value="history">
          <HistoryTab />
        </TabsContent>

        <TabsContent value="maintenance">
          <MaintenanceTab selectedDrone={selectedDrone} />
        </TabsContent>
      </Tabs>

      <AddDroneDialog open={showAddDialog} onOpenChange={setShowAddDialog} stations={stations} onSuccess={() => fetchDronesByStation(selectedStation)} />
      {selectedDrone && (
        <EditDroneDialog open={showEditDialog} onOpenChange={setShowEditDialog} drone={selectedDrone} onSuccess={() => fetchDroneDetails(selectedDrone.drone_code)} />
      )}
    </div>
  );
}