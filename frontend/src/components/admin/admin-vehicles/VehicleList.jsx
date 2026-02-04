import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SafeIcon from "@/components/common/SafeIcon";
import StatusBadge from "@/components/common/StatusBadge";
import EditVehicleModal from "./EditVehicleModal";

const API_BASE = import.meta.env.VITE_API_BASE_URL;
const API = `${API_BASE}/admin/admin-vehicle`;

export default function VehicleList({
  vehicles: initialVehicles = [],
  onUpdated,
  onView,
  stations = [],
}) {
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [editVehicle, setEditVehicle] = useState(null);

  useEffect(() => {
    setVehicles(Array.isArray(initialVehicles) ? initialVehicles : []);
  }, [initialVehicles]);

  const getVehicleTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "fire tender": return "Truck";
      case "ambulance": return "AlertTriangle";
      case "hydrant vehicle": return "Droplet";
      case "quick response vehicle": return "Zap";
      case "drone": return "Plane";
      case "support vehicle": return "Package";
      case "foam truck": return "Wind";
      case "ladder truck": return "Maximize2";
      default: return "Truck";
    }
  };

  // 🔥 UPDATE VEHICLE
  const handleEditSave = async (updated) => {
    try {
      const res = await fetch(`${API}/updateVehicle.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });

      const data = await res.json();

      if (data?.success) {
        // Update UI immediately
        setVehicles((prev) =>
          prev.map((v) =>
            v.id === updated.id ? { ...v, ...updated } : v
          )
        );

        onUpdated && onUpdated();
        setEditVehicle(null);
      }

      return data;
    } catch (e) {
      console.error(e);
      return {
        success: false,
        message: "Server error while updating vehicle",
      };
    }
  };

  if (!vehicles.length) {
    return (
      <Card>
        <CardContent className="p-12 text-center">No Vehicles Found</CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="space-y-3">
        {vehicles.map((vehicle) => (
          <Card
            key={vehicle.id}
            className="hover:border-primary/50 transition-colors"
          >
            <CardContent className="pt-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Info */}
                <div className="flex items-center gap-2">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <SafeIcon
                      name={getVehicleTypeIcon(vehicle.type)}
                      className="text-primary"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{vehicle.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {vehicle.type}
                    </p>
                  </div>
                </div>

                {/* Registration */}
                <div>
                  <p className="text-xs text-muted-foreground">Registration</p>
                  <p className="font-mono font-semibold">
                    {vehicle.registration}
                  </p>

                  <p className="text-xs text-muted-foreground mt-2">
                    Device ID
                  </p>
                  <p className="text-xs">{vehicle.device_id}</p>
                </div>

                {/* Location + Station */}
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="flex items-center gap-1">
                    <SafeIcon name="MapPin" size={14} /> {vehicle.location}
                  </p>

                  <p className="text-xs text-muted-foreground mt-2">Station</p>
                  <Badge variant="outline" className="text-xs">
                    {vehicle.station || "—"}
                  </Badge>
                </div>

                {/* Status + Actions */}
                <div>
                  <p className="text-xs mb-1 text-muted-foreground">Status</p>
                  <StatusBadge status={vehicle.status} showIcon />

                  <div className="flex gap-2 mt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onView(vehicle)}
                      className="gap-1"
                    >
                      <SafeIcon name="Eye" size={14} />
                      View
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditVehicle(vehicle)}
                    >
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 🔥 EDIT MODAL */}
      {editVehicle && (
        <EditVehicleModal
          open={true}
          vehicle={editVehicle}
          onClose={() => setEditVehicle(null)}
          onUpdate={handleEditSave}
          stations={stations}
        />
      )}
    </>
  );
}
