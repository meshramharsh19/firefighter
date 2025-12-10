import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import SafeIcon from "@/components/common/SafeIcon"

export default function VehicleMap({ vehicles }) {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>Vehicle Locations</CardTitle>
        <CardDescription>Real-time GPS tracking of all vehicles</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="relative w-full h-96 rounded-lg overflow-hidden bg-muted border border-border">

          {/* Map Placeholder */}
          <img
            src="https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/20/e31272d4-2503-418f-92bd-011ae1384837.png"
            alt="Vehicle Location Map"
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="text-center">
              <SafeIcon name="Map" size={48} className="text-white/60 mx-auto mb-3" />
              <p className="text-white font-medium">Interactive Map View</p>
              <p className="text-white/70 text-sm mt-1">
                {vehicles.length} vehicles tracked
              </p>
            </div>
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur rounded-lg p-3 border border-border">
            <p className="text-xs font-semibold mb-2">Status Legend</p>

            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Available</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-500" />
                <span>In Operation</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-orange-500" />
                <span>Maintenance</span>
              </div>
            </div>
          </div>

        </div>
      </CardContent>
    </Card>
  )
}
