import { useState } from "react";
import StatsCards from "./StatsCards";
import StationsMap from "./StationsMap";
import AddStationModal from "./AddStationModal";
import StationFilters from "./StationFilters";
import StationList from "./StationList";

export default function StationManagement() {
  const [open, setOpen] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    city: "All",
  });

  return (
    <div className="p-6 bg-[#0b0e11] min-h-screen text-white">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Station Management</h1>
          <p className="text-white/60">Manage & monitor stations</p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="px-5 py-2 rounded-lg border border-white/20 hover:bg-red-600 transition"
        >
          + Add New Station
        </button>
      </div>

      {/* STATS */}
      <StatsCards />

      {/* MAP */}
      <div className="mt-6">
        <StationsMap />
      </div>

      {/* FILTERS */}
      <div className="mt-8">
        <StationFilters filters={filters} setFilters={setFilters} />
      </div>

      {/* LIST */}
      <div className="mt-6">
        <StationList filters={filters} />
      </div>

      {/* MODAL */}
      {open && <AddStationModal onClose={() => setOpen(false)} />}
    </div>
  );
}