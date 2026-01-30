import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SafeIcon from "@/components/common/SafeIcon";
import { MOCK_DRONE_LOGS } from "@/data/DroneData";

export default function HistoryTab() {
  return (
    <Card>
      <CardHeader><CardTitle className="text-lg">Flight History</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        {MOCK_DRONE_LOGS.map((log, idx) => (
          <div key={idx} className="flex gap-4 border-b pb-4 last:border-0">
            <SafeIcon name="Plane" size={20} className="text-primary" />
            <div className="flex-1">
              <div className="flex justify-between">
                <p className="font-medium">{log.activity}</p>
                <span className="text-xs text-muted-foreground">{new Date(log.timestamp).toLocaleDateString()}</span>
              </div>
              <p className="text-sm text-muted-foreground">Pilot: {log.pilotName}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}