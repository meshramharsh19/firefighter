"use client";

import React, { useState, useEffect } from "react";
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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const API = "http://localhost/fire-fighter-new/backend/controllers";

export default function DroneMonitoringContent() {
  const [viewMode, setViewMode] = useState("map");

  const [drones, setDrones] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedWard, setSelectedWard] = useState("all");

  // 🔥 Fetch drones and auto-refresh every 5 sec
  function loadDrones() {
    fetch(`${API}/get_drone_locations.php`)
      .then((res) => res.json())
      .then((data) => setDrones(data));
  }

  useEffect(() => {
    loadDrones();
    const interval = setInterval(loadDrones, 5000);
    return () => clearInterval(interval);
  }, []);

  // Load Wards
  useEffect(() => {
    fetch(`${API}/wards.php`)
      .then((res) => res.json())
      .then((data) => setWards(data));
  }, []);

  // 🟡 Normalizing status to single format
  const normalizeStatus = (status) => {
    if (!status) return "unknown";
    const s = status.toLowerCase();

    if (["active", "patrolling", "active_mission"].includes(s)) return "active";
    if (["offline", "maintenance"].includes(s)) return "maintenance";
    if (s === "standby") return "standby";
    return "unknown";
  };

  // 🟢 Apply Ward Filter
  const filteredDrones =
    selectedWard === "all"
      ? drones
      : drones.filter((d) => d.ward == selectedWard);

  // 🟢 Status counts calculated based on filtered drones
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

  const prettyLabel = (text) =>
    text.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="space-y-6 p-6">

      {/* 🔥 Ward Dropdown Filter */}
      <div className="flex justify-start">
        <div className="w-48">
          <Select value={selectedWard} onValueChange={setSelectedWard}>
            <SelectTrigger className="border">
              <SelectValue placeholder="Select Ward" />
            </SelectTrigger>

            <SelectContent className="bg-gray-900 border text-white">
              <SelectItem value="all">All Wards</SelectItem>

              {wards.map((ward) => (
                <SelectItem key={ward} value={ward}>
                  Ward {ward}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Summary → Counts change per ward */}
      <DroneMonitoringHeader
        totalDrones={filteredDrones.length}
        activeDrones={activeDrones.length}
        maintenanceDrones={maintenanceDrones.length}
        standbyDrones={standbyDrones.length}
      />

      <div className="grid gap-6 lg:grid-cols-3">

        <div className="lg:col-span-2 space-y-4">
          <Card className="border border-white/10 transition-all duration-300">
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

        {/* Right side stats */}
        <div className="space-y-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Fleet Status</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>Total</span><Badge>{filteredDrones.length}</Badge>
              </div>
              <div className="flex justify-between">
                <span>Active</span><StatusBadge status="available" label={activeDrones.length.toString()} showIcon={false}/>
              </div>
              <div className="flex justify-between">
                <span>Maintenance</span><StatusBadge status="maintenance" label={maintenanceDrones.length.toString()} showIcon={false}/>
              </div>
              <div className="flex justify-between">
                <span>Standby</span><StatusBadge status="warning" label={standbyDrones.length.toString()} showIcon={false}/>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Full detailed table */}
      <Card>
        <CardHeader>
          <CardTitle>Drone Fleet Details</CardTitle>
          <CardDescription>Monitor detailed status & readiness</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="all">All ({filteredDrones.length})</TabsTrigger>
              <TabsTrigger value="active">Active ({activeDrones.length})</TabsTrigger>
              <TabsTrigger value="maintenance">Maintenance ({maintenanceDrones.length})</TabsTrigger>
              <TabsTrigger value="standby">Standby ({standbyDrones.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all"><DroneListTable drones={filteredDrones} getUIStatus={getUIStatus} prettyLabel={prettyLabel}/></TabsContent>
            <TabsContent value="active"><DroneListTable drones={activeDrones} getUIStatus={getUIStatus} prettyLabel={prettyLabel}/></TabsContent>
            <TabsContent value="maintenance"><DroneListTable drones={maintenanceDrones} getUIStatus={getUIStatus} prettyLabel={prettyLabel}/></TabsContent>
            <TabsContent value="standby"><DroneListTable drones={standbyDrones} getUIStatus={getUIStatus} prettyLabel={prettyLabel}/></TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
