import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import SafeIcon from "@/components/common/SafeIcon";

export default function DashboardSummaryStats({ stats }) {

  const theme = {
    card: "bg-[#17181A] border border-[#25272A] rounded-xl",
    muted: "text-gray-400",
    text: "text-gray-100",
    glowRed: "shadow-[0_0_18px_rgba(255,70,70,0.35)]",
  };

  const colorVariant = (type) => {
    const map = {
      red: "bg-red-500/15 border-red-500/40 text-red-400 shadow-[0_0_12px_rgba(255,60,60,0.35)]",
      orange: "bg-orange-500/15 border-orange-500/40 text-orange-300",
      green: "bg-green-500/15 border-green-500/40 text-green-300",
      blue: "bg-blue-500/15 border-blue-500/40 text-blue-300",
      gray: "bg-[#1f2023] border-[#2A2C2F] text-gray-400",
    };
    return map[type] || map.gray;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {stats.map((stat) => {
        const variant = colorVariant(stat.colorClass);
        const isAlert = stat.colorClass === "red";

        return (
          <Card
            key={stat.id}
            className={`${theme.card} transition-all duration-200 hover:scale-[1.03] ${
              isAlert ? theme.glowRed : "hover:border-blue-400/40 hover:shadow-[0_0_14px_rgba(59,130,246,0.25)]"
            }`}
          >
            <CardContent className="p-6">
              <div className="space-y-3">

                {/* Heading + Icon */}
                <div className="flex justify-between items-center">
                  <p className={`text-sm font-medium ${theme.muted}`}>{stat.title}</p>

                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center border ${variant}`}>
                    <SafeIcon name={stat.iconName} className="h-5 w-5" />
                  </div>
                </div>

                {/* Value */}
                <div className="flex items-baseline gap-2">
                  <p className={`text-4xl font-bold ${theme.text}`}>{stat.value}</p>
                  {stat.unit && <p className={`text-sm ${theme.muted}`}>{stat.unit}</p>}
                </div>

                {/* Red Alert footer */}
                {isAlert && (
                  <div className={`flex items-center gap-2 text-xs text-red-400 border-t border-red-500/20 pt-2`}>
                    <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
                    Attention Required
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
