import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

export default function VehicleDetailsModal({ open, onClose, vehicle }) {
  if (!vehicle) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-[#141414] text-white border border-[#2E2E2E]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Vehicle Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3 text-sm">
          <Detail label="Name" value={vehicle.name} />
          <Detail label="Type" value={vehicle.type} />
          <Detail label="Registration" value={vehicle.registration} />
          <Detail label="Device ID" value={vehicle.device_id} />
          <Detail label="Location" value={vehicle.location} />
          <Detail label="Station" value={vehicle.station} />

          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Status</span>
            <Badge variant="outline">{vehicle.status}</Badge>
          </div>

          <Detail label="Created At" value={vehicle.created_at} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Detail({ label, value }) {
  return (
    <div className="flex justify-between border-b border-[#2E2E2E] pb-1">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value || "-"}</span>
    </div>
  );
}
