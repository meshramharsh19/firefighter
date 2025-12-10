import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

/**
 * Renders a single summary stat card using shadcn Card component
 * @param {{ card: { title: string, value: number | string, description: string, color: string } }} props
 */
export default function DashboardSummaryCard({ card }) {
  // Map old CSS color names → Tailwind classes
  const colorMap = {
    green: "text-emerald-500",
    orange: "text-orange-500",
    red: "text-red-500",
    blue: "text-blue-500",
    yellow: "text-yellow-500",
    default: "text-primary",
  };

  return (
    <Card className="bg-card shadow-sm hover:shadow-md transition">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-muted-foreground">
          {card.title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <h2
          className={`text-3xl font-bold ${
            colorMap[card.color] || colorMap.default
          }`}
        >
          {card.value}
        </h2>
        <p className="text-xs text-muted-foreground mt-1">
          {card.description}
        </p>
      </CardContent>
    </Card>
  );
}
