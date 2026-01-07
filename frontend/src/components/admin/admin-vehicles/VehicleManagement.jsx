import { useState, useEffect } from "react";
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

  // ================= FETCH VEHICLES =================
  const loadVehicles = async () => {
    try {
      const res = await fetch(`${API}/get_vehicles.php`);
      const data = await res.json();
      setVehicles(data || []);
    } catch (e) {
      console.log("Fetch Error:", e);
    }
  };

  // ================= FETCH STATIONS =================
  const loadStations = async () => {
    try {
      const res = await fetch(`${API}/getStations.php`);
      const data = await res.json();
      setStations(data || []);
    } catch (e) {
      console.log("Station fetch error:", e);
    }
  };

  useEffect(() => {
    loadVehicles();
    loadStations();
  }, []);

  // ================= Add New Vehicle =================
  const handleAddVehicle = async (vehicleData) => {
    try {
      const res = await fetch(`${API}/add_vehicle.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(vehicleData),
      });

      const data = await res.json();

      // ❌ NO alert here
      // ❌ NO toast here
      // ✅ Just return response
      if (data?.success) {
        loadVehicles(); // refresh list only on success
      }

      return data;
    } catch (e) {
      console.error(e);
      return {
        success: false,
        message: "Server error while adding vehicle",
      };
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

    const matchStatus = selectedStatus === "all" || v.status === selectedStatus;

    const matchStation =
      selectedStation === "all" || v.station === selectedStation;

    return matchSearch && matchStatus && matchStation;
  });

  const statuses = ["all", "available", "busy", "en-route", "maintenance"];

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
            <div
              className="
      relative
      border border-[#2E2E2E] rounded
      bg-[#141414]
      hover:border-red-700
      focus-within:border-gray-300
    "
            >
              <SafeIcon
                name="Search"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />

              <Input
                className="
        pl-10
        bg-transparent
        border-none
        text-white
        focus:outline-none
        focus:ring-0
      "
                placeholder="Search by name, reg, location"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <label className="text-sm font-medium">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full p-2 rounded bg-[#141414] text-white border border-[#2E2E2E] focus:outline-none focus:border-gray-300
    hover:border-red-700"
            >
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Station Filter */}
          <div>
            <label className="text-sm font-medium">Station</label>
            <select
              value={selectedStation}
              onChange={(e) => setSelectedStation(e.target.value)}
              className="w-full p-2 rounded bg-[#141414] text-white border border-[#2E2E2E] focus:outline-none focus:border-gray-300
    hover:border-red-700"
            >
              <option value="all">All</option>
              {stations.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* View Tabs */}
      <Tabs value={viewMode} onValueChange={setViewMode}>
        <TabsList className="grid grid-cols-1 w-full md:w-auto">
          <TabsTrigger value="list">
            <SafeIcon name="List" size={16} /> List View
          </TabsTrigger>
          {/* <TabsTrigger value="map">
            <SafeIcon name="Map" size={16} /> Map View
          </TabsTrigger> */}
        </TabsList>

        <TabsContent value="list" className="mt-4">
          <VehicleList
            vehicles={filteredVehicles}
            onUpdated={loadVehicles}
            onView={handleViewVehicle}
          />
        </TabsContent>

        <TabsContent value="map" className="mt-4">
          <VehicleMap vehicles={filteredVehicles} />
        </TabsContent>
      </Tabs>

      {/* Modal */}
      <AddVehicleModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleAddVehicle}
      />

      <VehicleDetailsModal
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        vehicle={viewVehicle}
      />
    </div>
  );
}
