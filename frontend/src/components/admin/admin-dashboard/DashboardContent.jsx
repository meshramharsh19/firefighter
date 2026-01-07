import { useEffect, useState, useCallback } from "react";
import { toast } from "react-hot-toast"; 
import DashboardMapSection from "./DashboardMapSection";
import DashboardSummaryCard from "./DashboardSummaryCard";
import QuickAccessLinks from "./QuickAccessLinks";

const API = "http://localhost/fire-fighter-new/backend/controllers/admin/admin-dashboard";

export default function DashboardContent() {
  const [stats, setStats] = useState({
    total_drones: 0,
    inactive_drones: 0,
    ready_drones: 0,
  });

  const [activeDrones, setActiveDrones] = useState([]);
  const [droneLocations, setDroneLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mapMode, setMapMode] = useState("2d");

  // Fetch Dashboard Statistics
  const loadStats = useCallback(async (isAutoRefresh = false) => {
    try {
      const res = await fetch(`${API}/dashboard_stats.php`);
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error("Stats API Error:", err);
      // Critical Error: Only show if initial load fails
      if (!isAutoRefresh) toast.error("Failed to load dashboard stats");
    }
  }, []);

  // Fetch Active Drone List
  const loadActiveDrones = useCallback(async (isAutoRefresh = false) => {
    try {
      const res = await fetch(`${API}/active_drones.php`);
      const data = await res.json();
      setActiveDrones(data);
    } catch (err) {
      console.error("Active Drones API Error:", err);
      if (!isAutoRefresh) toast.error("Failed to load active drones");
    }
  }, []);

  // Fetch GPS Locations for Map
  const loadDroneLocations = useCallback(async (isAutoRefresh = false) => {
    try {
      const res = await fetch(`${API}/get_drone_locations.php`);
      const data = await res.json();
      setDroneLocations(data);
    } catch (err) {
      console.error("Drone Locations API Error:", err);
      if (!isAutoRefresh) toast.error("Failed to load GPS locations");
    }
  }, []);

  // Initial Load & Auto-Refresh Cycle
  useEffect(() => {
    const loadAll = async () => {
      setLoading(true);
      await Promise.all([
        loadStats(false), 
        loadActiveDrones(false), 
        loadDroneLocations(false)
      ]);
      setLoading(false);
    };

    loadAll();

    const interval = setInterval(() => {
      // Pass 'true' to suppress error toasts during background refresh
      loadStats(true);
      loadActiveDrones(true);
      loadDroneLocations(true);
    }, 5000);

    return () => clearInterval(interval);
  }, [loadStats, loadActiveDrones, loadDroneLocations]);

  const summaryCardsData = [
    { id: "total", title: "Total Drones", value: stats.total_drones, description: "Operational drones", color: "green" },
    { id: "inactive", title: "Not Active Drones", value: stats.inactive_drones, description: "Need attention", color: "red" },
    { id: "ready", title: "Ready to Fly", value: stats.ready_drones, description: "Ready for deployment", color: "green" },
  ];

  return (
    <div className="w-full p-6">
      <h1 className="text-2xl font-semibold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {summaryCardsData.map(card => (
          <DashboardSummaryCard key={card.id} card={card} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT: MAP + ACTIVE DRONES */}
        <div className="lg:col-span-2 space-y-6 border border-[#2E2E2E] rounded-xl">
          <DashboardMapSection
            mapMode={mapMode}
            setMapMode={setMapMode}
            activeDrones={activeDrones}
            droneLocations={droneLocations}
          />
        </div>

        {/* RIGHT: QUICK ACCESS */}
        <div className="lg:col-span-1 rounded-xl p-6 border border-[#2E2E2E] h-fit">
          <QuickAccessLinks />
        </div>
      </div>
    </div>
  );
}