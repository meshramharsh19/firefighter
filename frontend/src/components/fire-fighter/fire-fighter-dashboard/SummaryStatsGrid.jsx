import { useEffect, useState } from "react";
import StatusCard from "@/components/common/fire-fighter/StatusCard";
import useUserInfo from "@/components/common/auth/useUserInfo";

export default function SummaryStatsGrid() {
  const { station } = useUserInfo(); // Logged-in commander station
  
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  console.log("Station from user:", station);

  if (!station) {
    setLoading(false);
    return;
  }

  const url = `http://localhost/fire-fighter-new/backend/controllers/get_summary.php?station=${encodeURIComponent(station)}`;

  console.log("Calling API:", url);

  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log("API Response:", data);
      if (data.status) {
        setStats(data.summary);
      }
      setLoading(false);
    })
    .catch(err => {
      console.error("Summary fetch failed:", err);
      setLoading(false);
    });
}, [station]);

  if (loading) return <p className="text-white p-3">Loading statistics...</p>;
  if (!stats) return <p className="text-red-500 p-3">No summary found</p>;

  const summaryData = [
    { id: 1, title: "Incidents Today",       value: stats.today_count,       icon: "CalendarCheck", variant: "warning" },
    { id: 2, title: "Incidents This Month",  value: stats.month_count,       icon: "Calendar",      variant: "default" },
    { id: 3, title: "Active Incidents",      value: stats.inprogress_count,  icon: "Activity",      variant: "success" },
    { id: 4, title: "Critical Alerts",       value: stats.critical_count,    icon: "AlertTriangle", variant: "danger" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {summaryData.map(stat => (
        <StatusCard
          key={stat.id}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          variant={stat.variant}
          className="bg-[#131416] border border-[#1e1f22] hover:border-[#2b2c30] transition-all"
        />
      ))}
    </div>
  );
}
