import { useEffect, useState, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import DashboardMapSection from "./DashboardMapSection";
import DashboardSummaryCard from "./DashboardSummaryCard";
import QuickAccessLinks from "./QuickAccessLinks";

const API = "http://localhost/fire-fighter-new/backend/controllers";

export default function DashboardContent() {
  const [stats, setStats] = useState({
    total_drones: 0,
    inactive_drones: 0,
    ready_drones: 0,
  });

  const [activeDrones, setActiveDrones] = useState([]);
  const [droneLocations, setDroneLocations] = useState([]);   // ⭐ Add GPS state
  const [loading, setLoading] = useState(true);
  const [mapMode, setMapMode] = useState("2d");

  const loadStats = useCallback(async () => {
    try {
      const res = await fetch(`${API}/dashboard_stats.php`);
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error("Stats API Error:", err);
    }
  }, []);

  const loadActiveDrones = useCallback(async () => {
    try {
      const res = await fetch(`${API}/active_drones.php`);
      const data = await res.json();
      setActiveDrones(data);
    } catch (err) {
      console.error("Active Drones API Error:", err);
    }
  }, []);

  // ⭐ Load GPS locations
  const loadDroneLocations = useCallback(async () => {
    try {
      const res = await fetch(`${API}/get_drone_locations.php`);
      const data = await res.json();
      console.log("GPS API:", data);
      setDroneLocations(data);
    } catch (err) {
      console.error("Drone Locations API Error:", err);
    }
  }, []);

  useEffect(() => {
    const loadAll = async () => {
      setLoading(true);
      await Promise.all([loadStats(), loadActiveDrones(), loadDroneLocations()]);
      setLoading(false);
    };

    loadAll();

    const interval = setInterval(() => {
      loadStats();
      loadActiveDrones();
      loadDroneLocations(); // ⭐ Auto refresh GPS
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
        <div className="lg:col-span-2 space-y-6">
          <DashboardMapSection
            mapMode={mapMode}
            setMapMode={setMapMode}
            activeDrones={activeDrones}
            droneLocations={droneLocations}   // ⭐ Pass GPS to map
          />
        </div>

        {/* RIGHT: QUICK ACCESS */}
        <div className="lg:col-span-1">
          <QuickAccessLinks />
        </div>

      </div>
    </div>
  );
}
