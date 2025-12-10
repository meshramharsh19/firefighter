import { useEffect, useState } from "react";
import SummaryStatsGrid from "@/components/fire-fighter/fire-fighter-dashboard/SummaryStatsGrid.jsx";
import IncidentStreamTable from "@/components/fire-fighter/fire-fighter-dashboard/IncidentStreamTable.jsx";
import VehicleAvailabilityPanel from "@/components/fire-fighter/fire-fighter-dashboard/VehicleAvailabilityPanel.jsx";
import IncidentAlertFeed from "@/components/fire-fighter/fire-fighter-dashboard/IncidentAlertFeed";
import useUserInfo from "@/components/common/auth/useUserInfo";

const API = "http://localhost/fire-fighter-new/backend/controllers";

export default function FireFighterDashboard() {
  const { station, role, name } = useUserInfo();   

  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Fetch Incidents for logged-in user's station only
  useEffect(() => {
    if (!station) {
      setLoading(false);
      return;
    }

    const url = `${API}/incidents.php?station=${encodeURIComponent(station)}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.status && Array.isArray(data.data)) {
          setIncidents(
            data.data.map((inc) => ({
              id: inc.id,
              name: inc.name,
              location: inc.location,
              latitude: inc.latitude,       // ⬅ FIXED
              longitude: inc.longitude,     // ⬅ FIXED
              status: inc.status?.toLowerCase(),
              time: new Date(inc.time).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              }),
            }))
          );
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching incidents:", err);
        setLoading(false);
      });
  }, [station]);

  if (loading)
    return <p className="text-white p-4">Loading incidents...</p>;

  if (!station) {
    return (
      <div className="min-h-screen bg-[#0d0d0f] text-gray-200 flex items-center justify-center">
        <p className="text-gray-300">
          No station linked with this account. Please contact admin.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0d0f] text-gray-200">

      <main className="min-h-[calc(100vh-64px)]">
        <div className="container mx-auto px-6 py-6 space-y-8">

          {/* Summary */}
          <div className="bg-[#131416] rounded-xl p-4 shadow-md border border-[#1e1f22]">
            <SummaryStatsGrid />
          </div>


          <IncidentAlertFeed apiBase={API} />

          {/* Incident Table */}
          <div className="bg-[#131416] rounded-xl p-4 shadow border border-[#1e1f22]">
            <IncidentStreamTable incidents={incidents} />
          </div>

          {/* Vehicle Panel */}
          <div className="bg-[#131416] rounded-xl p-5 shadow border border-[#1e1f22]">
            <VehicleAvailabilityPanel />
          </div>

        </div>
      </main>
    </div>
  );
}
