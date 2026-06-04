import { useState, useEffect, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import SafeIcon from "@/components/common/SafeIcon";

export default function VehicleStats({ vehicles = [] }) {
  // Theme observer
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // Recalculate stats whenever vehicles change
  const statsData = useMemo(() => {
    return {
      total: vehicles.length,
      active: vehicles.filter(
        (v) => v.status?.toLowerCase() === "available"
      ).length,
      busy: vehicles.filter((v) =>
        ["busy", "on-mission"].includes(v.status?.toLowerCase())
      ).length,
      maintenance: vehicles.filter(
        (v) => v.status?.toLowerCase() === "maintenance"
      ).length,
    };
  }, [vehicles]);

  const stats = [
    {
      label: "Total Vehicles",
      value: statsData.total,
      icon: "Truck",
      color: "text-blue-400",
      bg: "bg-blue-500/10 border-blue-500/40",
    },
    {
      label: "Active",
      value: statsData.active,
      icon: "CheckCircle",
      color: "text-green-400",
      bg: "bg-green-500/10 border-green-500/40",
    },
    {
      label: "On Mission",
      value: statsData.busy,
      icon: "Navigation",
      color: "text-amber-400",
      bg: "bg-amber-500/10 border-amber-500/40",
    },
    {
      label: "Maintenance",
      value: statsData.maintenance,
      icon: "Wrench",
      color: "text-red-400",
      bg: `bg-red-500/10 border-red-500/40 ${
        statsData.maintenance > 0 ? "animate-pulse" : ""
      }`,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((item) => (
        <Card
          key={item.label}
          className="shadow-sm hover:shadow-md transition duration-200"
        >
          <CardContent className="pt-6 pb-5">
            <div className="flex items-center justify-between">
              <div>
                <p
                  className="text-sm font-medium"
                  style={{
                    color: isDark ? "#9ca3af" : "#6b7280",
                  }}
                >
                  {item.label}
                </p>

                <p
                  className="text-3xl font-bold mt-2"
                  style={{
                    color: isDark ? "#f3f4f6" : "#111827",
                  }}
                >
                  {item.value}
                </p>
              </div>

              <div
                className={`p-3 rounded-lg border flex items-center justify-center ${item.bg}`}
              >
                <SafeIcon
                  name={item.icon}
                  size={26}
                  className={item.color}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}