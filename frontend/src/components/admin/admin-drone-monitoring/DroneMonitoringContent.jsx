"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
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

const API_BASE = import.meta.env.VITE_API_BASE_URL;
const API = `${API_BASE}/admin/admin-drone-monitoring`;

export default function DroneMonitoringContent() {
  const [viewMode, setViewMode] = useState("map");
  const [drones, setDrones] = useState([]);
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState("all");

  const [stationOpen, setStationOpen] = useState(false);
  const [stationSearch, setStationSearch] = useState("");
  const dropdownRef = useRef(null);

  const loadDrones = useCallback(async (isAutoRefresh = false) => {
    try {
      const res = await fetch(`${API}/get_drone_locations.php`);
      if (!res.ok) throw new Error("Failed to fetch drones");
      const data = await res.json();
      setDrones(data);
    } catch (err) {
      console.error(err);
      if (!isAutoRefresh) toast.error("Failed to load drone fleet data");
    }
  }, []);

  const loadStations = useCallback(async () => {
    try {
      const res = await fetch(`${API}/getStations.php`);
      if (!res.ok) throw new Error("Failed to fetch stations");
      const data = await res.json();
      setStations(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load stations list");
    }
  }, []);

  useEffect(() => {
    const initData = async () => {
      await Promise.all([loadDrones(false), loadStations()]);
    };

    initData();

    const interval = setInterval(() => {
      loadDrones(true);
    }, 5000);

    return () => clearInterval(interval);
  }, [loadDrones, loadStations]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setStationOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const normalizeStatus = (status) => {
    if (!status) return "unknown";
    const s = status.toLowerCase();

    if (["active", "patrolling", "active_mission"].includes(s)) return "active";
    if (["offline", "maintenance"].includes(s)) return "maintenance";
    if (s === "standby") return "standby";
    return "unknown";
  };

  const filteredStations = stations.filter((st) =>
    st.toLowerCase().includes(stationSearch.toLowerCase())
  );

  const filteredDrones =
    selectedStation === "all"
      ? drones
      : drones.filter((d) => d.station === selectedStation);

  const activeDrones = filteredDrones.filter(
    (d) => normalizeStatus(d.status) === "active"
  );

  const maintenanceDrones = filteredDrones.filter(
    (d) => normalizeStatus(d.status) === "maintenance"
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
        <div className="w-64 relative" ref={dropdownRef}>
          <label className="text-sm font-medium">Station</label>

          <div
            onClick={() => setStationOpen(!stationOpen)}
            className="w-full p-2 rounded bg-[#141414] text-white border border-[#2E2E2E] cursor-pointer flex justify-between"
          >
            <span>
              {selectedStation === "all" ? "All Stations" : selectedStation}
            </span>
            <span>▼</span>
          </div>

          {stationOpen && (
            <div className="absolute z-50 mt-1 w-full bg-[#141414] border border-[#2E2E2E] rounded shadow-lg">
              <input
                type="text"
                placeholder="Search station..."
                value={stationSearch}
                onChange={(e) => setStationSearch(e.target.value)}
                className="w-full px-3 py-2 bg-[#141414] text-white border-b border-[#2E2E2E] outline-none rounded-t"
              />

              <div className="max-h-40 overflow-y-auto custom-scrollbar">
                <div
                  onClick={() => {
                    setSelectedStation("all");
                    setStationOpen(false);
                    setStationSearch("");
                  }}
                  className="px-4 py-2 hover:bg-[#2E2E2E] cursor-pointer"
                >
                  All Stations
                </div>

                {filteredStations.map((station, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setSelectedStation(station);
                      setStationOpen(false);
                      setStationSearch("");
                    }}
                    className="px-4 py-2 hover:bg-[#2E2E2E] cursor-pointer"
                  >
                    {station}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <DroneMonitoringHeader
        totalDrones={filteredDrones.length}
        activeDrones={activeDrones.length}
        maintenanceDrones={maintenanceDrones.length}
        standbyDrones={standbyDrones.length}
      />

      {/* Map + Status Section */}
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
                <StatusBadge status="available" label={activeDrones.length.toString()} showIcon={false} />
              </div>
              <div className="flex justify-between">
                <span>Maintenance</span>
                <StatusBadge status="maintenance" label={maintenanceDrones.length.toString()} showIcon={false} />
              </div>
              <div className="flex justify-between">
                <span>Standby</span>
                <StatusBadge status="warning" label={standbyDrones.length.toString()} showIcon={false} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ✅ TABLE SECTION RESTORED */}
      <Card>
        <CardHeader>
          <CardTitle>Drone Fleet Details</CardTitle>
          <CardDescription>Station-wise drone monitoring</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="all">All ({filteredDrones.length})</TabsTrigger>
              <TabsTrigger value="active">Active ({activeDrones.length})</TabsTrigger>
              <TabsTrigger value="maintenance">Maintenance ({maintenanceDrones.length})</TabsTrigger>
              <TabsTrigger value="standby">Standby ({standbyDrones.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <DroneListTable drones={filteredDrones} getUIStatus={getUIStatus} prettyLabel={prettyLabel} />
            </TabsContent>

            <TabsContent value="active">
              <DroneListTable drones={activeDrones} getUIStatus={getUIStatus} prettyLabel={prettyLabel} />
            </TabsContent>

            <TabsContent value="maintenance">
              <DroneListTable drones={maintenanceDrones} getUIStatus={getUIStatus} prettyLabel={prettyLabel} />
            </TabsContent>

            <TabsContent value="standby">
              <DroneListTable drones={standbyDrones} getUIStatus={getUIStatus} prettyLabel={prettyLabel} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

    </div>
  );
}