import { useEffect, useState, useCallback } from "react";
import StationCard from "./StationCard";
import { toast } from "react-hot-toast";

const API_BASE = import.meta.env.VITE_API_BASE_URL;
const API = `${API_BASE}/admin/station`;

export default function StationList({
  filters,
  onViewMap = () => {},      
  onEditStation = () => {},  
  refreshTrigger,
}) {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStations = useCallback(async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${API}/get_stations.php?search=${encodeURIComponent(filters.search || "")}`
      );

      if (!res.ok) throw new Error("Network response not ok");

      const data = await res.json();

      if (data.status) {
        setStations(data.stations || []);
      } else {
        toast.error("Failed to load stations");
      }
    } catch (err) {
      console.error("Fetch stations error:", err);
      toast.error("Server error while fetching stations");
    } finally {
      setLoading(false);
    }
  }, [filters.search]);

  useEffect(() => {
    fetchStations();
  }, [fetchStations, refreshTrigger]);

  if (loading) {
    return <p className="text-gray-400">Loading stations...</p>;
  }

  if (stations.length === 0) {
    return <p className="text-gray-500">No stations found</p>;
  }

  return (
    <div className="space-y-6">
      {stations.map((station) => (
        <StationCard
          key={station.id}
          station={station}
          onViewMap={onViewMap}
          onEditStation={onEditStation}
        />
      ))}
    </div>
  );
}
