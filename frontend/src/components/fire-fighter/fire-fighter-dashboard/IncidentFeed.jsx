import { INCIDENT_LIST_FEED } from "@/data/fire-fighter/incident";
import IncidentTable from "@/components/common/fire-fighter/IncidentTable";

export default function IncidentStreamTable() {
  const incidents = INCIDENT_LIST_FEED.map((incident) => ({
    id: incident.id,
    name: incident.name,
    location: incident.location,
    latitude: incident.coordinates.lat,
    longitude: incident.coordinates.lng,
    time: new Date(incident.timeReported).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    status: incident.status,
  }));

  const handleViewDetails = (id) => {
    // later route can change to page navigation
    window.location.href = `/fire-fighter/incident-details/${id}`;
  };

  return (
    <div className="rounded-xl bg-[#131416] border border-[#1e1f22] p-4">
      <IncidentTable 
        incidents={incidents}
        onViewDetails={handleViewDetails}
      />
    </div>
  );
}
