import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SafeIcon from "@/components/common/SafeIcon";
import Select from "react-select";


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

      console.log("Stations loaded:", stationArray);
    } catch (e) {
      console.log("Station fetch error:", e);
      setStations([]);
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

    const matchStatus = selectedStatus === "all" || v.status === selectedStatus;
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
            <div className="relative border border-[#2E2E2E] rounded bg-[#141414] hover:border-red-700 focus-within:border-gray-300">
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

          {/* Status Filter */}
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

          {/* Station Filter */}
          <div>
            <label className="text-sm font-medium">Station</label>
            <Select
              classNamePrefix="react-select"
              options={[
                { value: "all", label: "All" },
                ...stations.map((st) => ({ value: st.name, label: st.name })),
              ]}
              value={
                selectedStation === "all"
                  ? { value: "all", label: "Search station..." }
                  : { value: selectedStation, label: selectedStation }
              }
              onChange={(selected) => setSelectedStation(selected.value)}
              isSearchable={true}
              placeholder="Search station..."
              menuPortalTarget={document.body}
              menuPosition="fixed"
              components={{ DropdownIndicator: () => null }} // <-- remove arrow
              styles={{
                control: (base, state) => ({
                  ...base,
                  backgroundColor: "#141414",
                  borderColor: "#2E2E2E",
                  boxShadow: "none",
                  "&:hover": { borderColor: "#2E2E2E" }, // no blue hover
                  color: "white",
                }),
                menu: (base) => ({
                  ...base,
                  backgroundColor: "#141414",
                  maxHeight: 120,
                  overflowY: "auto",
                }),
                menuPortal: (base) => ({
                  ...base,
                  zIndex: 9999,
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isFocused ? "#2E2E2E" : "#141414", // dark hover
                  color: "white",
                  cursor: "pointer",
                }),
                singleValue: (base) => ({
                  ...base,
                  color: "white",
                }),
                input: (base) => ({
                  ...base,
                  color: "white",
                }),
                placeholder: (base) => ({
                  ...base,
                  color: "#888",
                }),
              }}
            />

          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={viewMode} onValueChange={setViewMode}>
        <TabsList className="grid grid-cols-1 w-full md:w-auto">
          <TabsTrigger value="list">
            <SafeIcon name="List" size={16} /> List View
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="mt-4">
          <VehicleList
            vehicles={filteredVehicles}
            onUpdated={loadVehicles}
            onView={handleViewVehicle}
            stations={stations}
          />
        </TabsContent>

        <TabsContent value="map" className="mt-4">
          <VehicleMap vehicles={filteredVehicles} />
        </TabsContent>
      </Tabs>

      {/* Modals */}
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
