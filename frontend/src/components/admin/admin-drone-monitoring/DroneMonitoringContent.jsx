"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import StatusBadge from "@/components/common/StatusBadge";
import DroneMonitoringMap from "./DroneMonitoringMap";
import DroneListTable from "./DroneListTable";
import DroneMonitoringHeader from "./DroneMonitoringHeader";
import { toast } from "react-hot-toast"; 
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const API_BASE = import.meta.env.VITE_API_BASE_URL;
const API = `${API_BASE}/admin/admin-drone-monitoring`;

export default function DroneMonitoringContent() {
  const [viewMode, setViewMode] = useState("map");
  const [drones, setDrones] = useState([]);
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState("all");

  /* ---------------- Fetch drones (auto refresh) ---------------- */
  const loadDrones = useCallback(async (isAutoRefresh = false) => {
    try {
      const res = await fetch(`${API}/get_drone_locations.php`);
      if (!res.ok) throw new Error("Failed to fetch drones");
      const data = await res.json();
      setDrones(data);
    } catch (err) {
      console.error(err);
      // Only show error toast if it's NOT an auto-refresh
      if (!isAutoRefresh) toast.error("Failed to load drone fleet data");
    }
  }, []);

  /* ---------------- Fetch stations ---------------- */
  const loadStations = useCallback(async () => {
    try {
      const res = await fetch(`${API}/getStations.php`);
      if (!res.ok) throw new Error("Failed to fetch stations");
      const data = await res.json();
      setStations(data);
    } catch (err) {
      console.error(err);
      // Critical error: Always show
      toast.error("Failed to load stations list");
    }
  }, []);

  /* ---------------- Initial Load & Interval ---------------- */
  useEffect(() => {
    const initData = async () => {
      // Load initial data quietly
      await Promise.all([loadDrones(false), loadStations()]);
    };

    initData();

    const interval = setInterval(() => {
      // Pass true so background connection errors don't spam the user
      loadDrones(true); 
    }, 5000);

    return () => clearInterval(interval);
  }, [loadDrones, loadStations]);

  /* ---------------- Status normalize ---------------- */
  const normalizeStatus = (status) => {
    if (!status) return "unknown";
    const s = status.toLowerCase();

    if (["active", "patrolling", "active_mission"].includes(s)) return "active";
    if (["offline", "maintenance"].includes(s)) return "maintenance";
    if (s === "standby") return "standby";
    return "unknown";
  };

  /* ---------------- Station filter ---------------- */
  const filteredDrones =
    selectedStation === "all"
      ? drones
      : drones.filter((d) => d.station === selectedStation);

  /* ---------------- Counts ---------------- */
  const activeDrones = filteredDrones.filter(
    (d) => normalizeStatus(d.status) === "active"
  );

  const maintenanceDrones = filteredDrones.filter(
    (d) =>
      normalizeStatus(d.status) === "maintenance" ||
      normalizeStatus(d.status) === "offline"
  );

  const standbyDrones = filteredDrones.filter(
    (d) => normalizeStatus(d.status) === "standby"
  );

  const getUIStatus = (status) => {
    const s = normalizeStatus(status);
    return s === "active"
      ? "available"
      : s === "maintenance"
      ? "maintenance"
      : s === "standby"
      ? "warning"
      : "unknown";
  };

  const prettyLabel = (text = "") =>
    text.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="space-y-6 p-6">
      {/* Station Dropdown */}
    <div className="flex justify-start">
  <div className="w-64">
    <label className="text-sm font-medium">Station</label> {/* Added label to match theme */}
    <Select value={selectedStation} onValueChange={setSelectedStation}>
      
      {/* Trigger matches Status/Ward: bg-[#141414], border-gray-700, and no focus ring */}
      <SelectTrigger className="w-full p-2 bg-[#141414] text-white border border-gray-700 rounded focus:ring-0 focus:ring-offset-0 focus:outline-none">
        <SelectValue placeholder="Select Station" />
      </SelectTrigger>

      {/* Content matches the dropdown theme */}
      <SelectContent className="bg-[#141414] border-gray-700 text-white">
        {/* Hide the default checkmark and add spacing */}
        <SelectItem 
          value="all" 
          className="focus:bg-gray-800 focus:text-white cursor-pointer [&>span:first-child]:hidden"
        >
          All Stations
        </SelectItem>

        {stations.map((station) => (
          <SelectItem 
            key={station} 
            value={station} 
            className="focus:bg-gray-800 focus:text-white cursor-pointer [&>span:first-child]:hidden"
          >
            {station}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
</div>


      {/* Summary */}
      <DroneMonitoringHeader
        totalDrones={filteredDrones.length}
        activeDrones={activeDrones.length}
        maintenanceDrones={maintenanceDrones.length}
        standbyDrones={standbyDrones.length}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <Card className="border border-white/10">
            <CardContent>
              {viewMode === "map" ? (
                <DroneMonitoringMap drones={filteredDrones} />
              ) : (
                <DroneListTable
                  drones={filteredDrones}
                  getUIStatus={getUIStatus}
                  prettyLabel={prettyLabel}
                />
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right stats */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Fleet Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>Total</span>
                <Badge>{filteredDrones.length}</Badge>
              </div>
              <div className="flex justify-between">
                <span>Active</span>
                <StatusBadge
                  status="available"
                  label={activeDrones.length.toString()}
                  showIcon={false}
                />
              </div>
              <div className="flex justify-between">
                <span>Maintenance</span>
                <StatusBadge
                  status="maintenance"
                  label={maintenanceDrones.length.toString()}
                  showIcon={false}
                />
              </div>
              <div className="flex justify-between">
                <span>Standby</span>
                <StatusBadge
                  status="warning"
                  label={standbyDrones.length.toString()}
                  showIcon={false}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Detailed table */}
      <Card>
        <CardHeader>
          <CardTitle>Drone Fleet Details</CardTitle>
          <CardDescription>Station-wise drone monitoring</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="all">
                All ({filteredDrones.length})
              </TabsTrigger>
              <TabsTrigger value="active">
                Active ({activeDrones.length})
              </TabsTrigger>
              <TabsTrigger value="maintenance">
                Maintenance ({maintenanceDrones.length})
              </TabsTrigger>
              <TabsTrigger value="standby">
                Standby ({standbyDrones.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <DroneListTable
                drones={filteredDrones}
                getUIStatus={getUIStatus}
                prettyLabel={prettyLabel}
              />
            </TabsContent>

            <TabsContent value="active">
              <DroneListTable
                drones={activeDrones}
                getUIStatus={getUIStatus}
                prettyLabel={prettyLabel}
              />
            </TabsContent>

            <TabsContent value="maintenance">
              <DroneListTable
                drones={maintenanceDrones}
                getUIStatus={getUIStatus}
                prettyLabel={prettyLabel}
              />
            </TabsContent>

            <TabsContent value="standby">
              <DroneListTable
                drones={standbyDrones}
                getUIStatus={getUIStatus}
                prettyLabel={prettyLabel}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}