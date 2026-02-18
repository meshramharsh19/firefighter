import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SafeIcon from "@/components/common/SafeIcon";

// Components
import VehicleStats from "./VehicleStats";
import VehicleList from "./VehicleList";
import VehicleMap from "./VehicleMap";
import AddVehicleModal from "./AddVehicleModal";
import VehicleDetailsModal from "./VehicleDetailsModal";

const API_BASE = import.meta.env.VITE_API_BASE_URL;
const API = `${API_BASE}/admin/admin-vehicle`;

export default function VehicleManagement() {
  const [vehicles, setVehicles] = useState([]);
  const [stations, setStations] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedStation, setSelectedStation] = useState("all");

  const [viewMode, setViewMode] = useState("list");
  const [openModal, setOpenModal] = useState(false);

  const [viewVehicle, setViewVehicle] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);

  /* 🔥 Station Dropdown State */
  const [stationOpen, setStationOpen] = useState(false);
  const [stationSearch, setStationSearch] = useState("");
  const dropdownRef = useRef(null);

  // ================= FETCH VEHICLES =================
  const loadVehicles = async () => {
    try {
      const res = await fetch(`${API}/get_vehicles.php`);
      const data = await res.json();
      setVehicles(Array.isArray(data) ? data : []);
    } catch (e) {
      console.log("Vehicle Fetch Error:", e);
      setVehicles([]);
    }
  };

  // ================= FETCH STATIONS =================
  const loadStations = async () => {
    try {
      const res = await fetch(`${API_BASE}/admin/station/get_stations.php`);
      const data = await res.json();
      const stationArray = Array.isArray(data) ? data : data.stations || [];
      setStations(stationArray);
    } catch (e) {
      console.log("Station fetch error:", e);
      setStations([]);
    }
  };

  useEffect(() => {
    loadVehicles();
    loadStations();
  }, []);

  /* 🔥 Close dropdown on outside click */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setStationOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* 🔥 Filtered Stations */
  const filteredStations = stations.filter((st) =>
    st.name.toLowerCase().includes(stationSearch.toLowerCase())
  );

  // ================= Add Vehicle =================
  const handleAddVehicle = async (vehicleData) => {
    try {
      const res = await fetch(`${API}/add_vehicle.php`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(vehicleData),
      });

      const data = await res.json();
      if (data?.success) loadVehicles();

      return data;
    } catch (e) {
      console.error(e);
      return { success: false, message: "Server error while adding vehicle" };
    }
  };

  const handleViewVehicle = (vehicle) => {
    setViewVehicle(vehicle);
    setViewOpen(true);
  };

  // ================= Filter Logic =================
  const filteredVehicles = vehicles.filter((v) => {
    const s = searchQuery.toLowerCase();

    const matchSearch =
      v.name?.toLowerCase().includes(s) ||
      v.location?.toLowerCase().includes(s) ||
      v.registration?.toLowerCase().includes(s);

    const matchStatus =
      selectedStatus === "all" || v.status === selectedStatus;

    const matchStation =
      selectedStation === "all" || v.station === selectedStation;

    return matchSearch && matchStatus && matchStation;
  });

  const statuses = ["all", "active", "on-mission", "maintenance"];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Vehicle Management</h1>
          <p className="text-muted-foreground">
            Manage & monitor station vehicles
          </p>
        </div>

        <Button
          variant="outline"
          onClick={() => setOpenModal(true)}
          className="gap-2"
        >
          <SafeIcon name="Plus" size={18} /> Add New Vehicle
        </Button>
      </div>

      {/* Stats */}
      <VehicleStats vehicles={vehicles} />

      {/* Filters */}
      <Card className="bg-card shadow-sm hover:shadow-md transition">
        <CardHeader>
          <CardTitle>Filters & Search</CardTitle>
        </CardHeader>

        <CardContent className="grid gap-4 md:grid-cols-3">
          {/* Search */}
          <div>
            <label className="text-sm font-medium">Search</label>
            <div className="relative border border-[#2E2E2E] rounded bg-[#141414]">
              <SafeIcon
                name="Search"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                className="pl-10 bg-transparent border-none text-white focus:outline-none focus:ring-0"
                placeholder="Search by name, reg, location"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="text-sm font-medium">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full p-2 rounded bg-[#141414] text-white border border-[#2E2E2E]"
            >
              {statuses.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* 🔥 Custom Station Filter */}
          <div className="relative" ref={dropdownRef}>
            <label className="text-sm font-medium">Station</label>

            {/* Trigger */}
            <div
              onClick={() => setStationOpen(!stationOpen)}
              className="w-full p-2 rounded bg-[#141414] text-white border border-[#2E2E2E] cursor-pointer flex justify-between"
            >
              <span>
                {selectedStation === "all" ? "All Stations" : selectedStation}
              </span>
              <span>▼</span>
            </div>

            {/* Dropdown */}
            {stationOpen && (
              <div className="absolute z-50 mt-1 w-full bg-[#141414] border border-[#2E2E2E] rounded shadow-lg">

                {/* Search */}
                <input
                  type="text"
                  placeholder="Search station..."
                  value={stationSearch}
                  onChange={(e) => setStationSearch(e.target.value)}
                  className="w-full px-3 py-2 bg-[#141414] text-white border-b border-[#2E2E2E] outline-none rounded-t"
                />

                {/* Options (scrollable, 3 items visible by default) */}
                <div className="max-h-36 overflow-y-auto no-scrollbar">
                  <div
                    onClick={() => {
                      setSelectedStation("all");
                      setStationOpen(false);
                      setStationSearch("");
                    }}
                    className="px-4 py-2 hover:bg-[#2E2E2E] cursor-pointer"
                  >
                    All
                  </div>

                  {filteredStations.map((st) => (
                    <div
                      key={st.id}
                      onClick={() => {
                        setSelectedStation(st.name);
                        setStationOpen(false);
                        setStationSearch("");
                      }}
                      className="px-4 py-2 hover:bg-[#2E2E2E] cursor-pointer"
                    >
                      {st.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </CardContent>
      </Card>

      {/* List */}
      <VehicleList
        vehicles={filteredVehicles}
        onUpdated={loadVehicles}
        onView={handleViewVehicle}
        stations={stations}
      />

      <AddVehicleModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleAddVehicle}
        stations={stations}
      />

      <VehicleDetailsModal
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        vehicle={viewVehicle}
      />
    </div>
  );
}
