import { useEffect, useState } from "react";
import StatusCard from "@/components/common/fire-fighter/StatusCard";
import useUserInfo from "@/components/common/auth/useUserInfo";

export default function SummaryStatsGrid({ onFilterChange }) {
  const { station } = useUserInfo(); // Logged-in user's station

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (!station) {
      setLoading(false);
      return;
    }

    const url = `${API_BASE}/get_summary.php?station=${encodeURIComponent(
      station
    )}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setStats(data.summary);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Summary fetch failed:", err);
        setLoading(false);
      });
  }, [station]);

  if (loading) return <p className="text-white p-3">Loading statistics...</p>;
  if (!stats) return <p className="text-red-500 p-3">No summary found</p>;

  const summaryData = [
    {
      id: 1,
      title: "Incidents Today",
      value: stats.today_count,
      icon: "CalendarCheck",
      variant: "danger",
      filterKey: "today",
    },
    {
      id: 2,
      title: "Incidents This Month",
      value: stats.month_count,
      icon: "Calendar",
      variant: "danger",
      filterKey: "month",
    },
    {
      id: 3,
      title: "Active Incidents",
      value: stats.inprogress_count,
      icon: "Activity",
      variant: "danger",
      filterKey: "active",
    },
    {
      id: 4,
      title: "Critical Alerts",
      value: stats.critical_count,
      icon: "AlertTriangle",
      variant: "danger",
      filterKey: "critical",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {summaryData.map((stat) => (
        <StatusCard
          key={stat.id}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          variant={stat.variant}
          onClick={() => onFilterChange(stat.filterKey)}
          className="
            bg-[#131416]
            border border-white/10
            hover:border-red-400
            hover:shadow-[0_0_10px_rgba(255,0,0,0.35)]
            transition-all duration-300
          "
        />
      ))}
    </div>
  );
}
